import { useEffect, useState } from "react";
import CarouselInicio from "../components/CarouselInicio";
import CarouselProductos from "../components/CarouselProductos";
import { useProductosContext } from "../contexts/ProductosContext";
import { esDestacado, esOferta } from "../utils/precios";

function Home() {
    const { obtenerProductos } = useProductosContext();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        let activo = true;
        obtenerProductos()
            .then((datos) => { if (activo) setTodos(datos || []); })
            .catch((error) => console.error("Error al cargar productos del inicio:", error));
        return () => { activo = false; };
    }, []);

    const marcados = todos.filter(esDestacado);
    // Mientras ningún producto esté marcado como destacado, se muestran los primeros 6
    // para que la sección no quede vacía. Borrá el "|| todos.slice(0, 6)" si no lo querés.
    const destacados = marcados.length ? marcados : todos.slice(0, 6);
    const ofertas = todos.filter(esOferta);

    return (
        <div>
            <section>
                <CarouselInicio />
            </section>
            <CarouselProductos titulo="PRODUCTOS DESTACADOS" productos={destacados} />
            <CarouselProductos titulo="OFERTAS" productos={ofertas} />
        </div>
    );
}

export default Home;
