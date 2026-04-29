import { createContext, useState, useContext } from 'react';
import Swal from "sweetalert2";

// Crear el contexto del manejo de Productos
const ProductosContext = createContext();

export function ProductosProvider({ children }) {

    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [productosBuscados, setProductosBuscados] = useState([]);

    const API_URL = "https://node-entrega-final-back-end.vercel.app/api/products";

    // ------------------- OBTENER TODOS LOS PRODUCTOS ------------------------------
    async function obtenerProductos() {
        try {
            const respuesta = await fetch(API_URL);
            if (!respuesta.ok) throw new Error("Error al obtener productos");

            const datos = await respuesta.json();

            setProductos(datos.payload);
            setProductosBuscados(datos.payload);

            return datos.payload;
        } catch (error) {
            throw new Error(error.message || "Error al obtener productos");
        }
    }

    // ------------------- OBTENER POR CATEGORÍA ------------------------------
    async function obtenerPorCategoria(categoria) {
        try {
            const respuesta = await fetch(API_URL);
            if (!respuesta.ok) throw new Error("Error obteniendo productos");

            const datos = await respuesta.json();

            const filtrados = datos.payload.filter(
                p => p.category?.toLowerCase() === categoria.toLowerCase()
            );

            setProductos(filtrados);
            setProductosBuscados(filtrados);

            return filtrados;

        } catch (error) {
            throw new Error(error.message || "Error al filtrar por categoría");
        }
    }

    // ------------------- CREAR PRODUCTO ------------------------------
    async function agregarProducto(producto) {
        try {
            const respuesta = await fetch(`${API_URL}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("authToken")
                },
                body: JSON.stringify(producto),
            });

            if (!respuesta.ok) throw new Error("Error al agregar producto");

            return await respuesta.json();

        } catch (error) {
            throw new Error(error.message);
        }
    }

    // ------------------- OBTENER UN PRODUCTO ------------------------------
    async function obtenerUnProducto(id) {
        try {
            const respuesta = await fetch(`${API_URL}/${id}`);
            if (!respuesta.ok) throw new Error("No se pudo obtener el producto");

            const data = await respuesta.json();
            const producto = data.payload;

            if (!producto) throw new Error("Producto no encontrado");

            setProductoSeleccionado(producto);

            return producto;

        } catch (error) {
            throw new Error(error.message || "Error al obtener el producto");
        }
    }

    // ------------------- EDITAR PRODUCTO ------------------------------
    async function editarProducto(producto) {
        try {
            const { id, ...resto } = producto;

            const respuesta = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("authToken")
                },
                body: JSON.stringify(resto),
            });

            if (!respuesta.ok) throw new Error("Error al actualizar el producto.");

            return await respuesta.json();

        } catch (error) {
            throw new Error(error.message || "Error al editar producto");
        }
    }

    // ------------------- ELIMINAR PRODUCTO ------------------------------
    async function eliminarProducto(id) {
        try {
            const respuesta = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: { "Authorization": "Bearer " + localStorage.getItem("authToken") }
            });

            if (!respuesta.ok) throw new Error("Error al eliminar producto");

            return true;

        } catch (error) {
            throw new Error(error.message || "Error al eliminar producto");
        }
    }

    // ------------------- FILTRAR PRODUCTOS ------------------------------
    function filtrarProductos(busqueda) {
        const texto = (typeof busqueda === "string"
            ? busqueda
            : busqueda?.name || ""
        ).toLowerCase();

        if (texto === "") {
            setProductos(productosBuscados);
            return;
        }

        const productosFiltrados = productosBuscados.filter((producto) => {
            const nombre = producto.name?.toLowerCase() || "";
            const categoria = producto.category?.toLowerCase() || "";
            return nombre.includes(texto) || categoria.includes(texto);
        });

        setProductos(productosFiltrados);
    }

    return (
        <ProductosContext.Provider
            value={{
                productos,
                productoSeleccionado,
                obtenerProductos,
                obtenerUnProducto,
                agregarProducto,
                editarProducto,
                eliminarProducto,
                filtrarProductos,
                obtenerPorCategoria
            }}
        >
            {children}
        </ProductosContext.Provider>
    );
}

export const useProductosContext = () => useContext(ProductosContext);
