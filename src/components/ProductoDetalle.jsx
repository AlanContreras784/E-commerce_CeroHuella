import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import "../styles/BtnWhatsApp.css";
import { dispararSweetAlertBasico, dispararSweetAlertTrueFalse } from "../assets/SweetAlert";
import 'bootstrap/dist/css/bootstrap.min.css';
// --- CARRITO (desactivado por ahora, descomentar cuando se vuelva a usar) ---
// import { CarritoContext } from "../contexts/CarritoContext";
// import { ToastContainer, toast } from "react-toastify";
// import { MdOutlineAddShoppingCart } from "react-icons/md";
// -----------------------------------------------------------------------------
import { Button } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { FaRegEdit, FaRegTrashAlt, FaWhatsapp } from "react-icons/fa";
import { descuentoDe, esOferta, precioFinal } from "../utils/precios";
import { mensajeConsultaProducto, urlWhatsApp } from "../config/contacto";

function ProductoDetalle() {
  // const { agregarAlCarrito } = useContext(CarritoContext); // CARRITO (si lo reactivás, importá también useContext de "react")
  const { admin } = useAuthContext();
  const { obtenerUnProducto, productoSeleccionado, eliminarProducto } = useProductosContext();
  const { id } = useParams();
  // const [cantidad, setCantidad] = useState(1); // CARRITO
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Cargar producto al montar el componente
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        await obtenerUnProducto(id);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
        setError('Hubo un problema al cargar el producto.');
      } finally {
        setCargando(false);
      }
    };
    cargarProducto();
  }, [id, obtenerUnProducto]);

  // Función para eliminar producto
  async function dispararEliminar() {
    try {
      const confirmar = await dispararSweetAlertTrueFalse(
        '¿Estás seguro que quieres eliminar este producto?',
        'Esto no se puede deshacer',
        'warning',
        'Sí, Eliminar'
      );
      if (confirmar) {
        await eliminarProducto(id);
        dispararSweetAlertBasico('Eliminado', 'Producto eliminado correctamente.', 'success', 'OK');
        navigate('/productos');
      }
    } catch (err) {
      dispararSweetAlertBasico("Hubo un problema al eliminar el producto", err.message || err, "error", "Cerrar");
    }
  }

  // --- CARRITO (desactivado por ahora) ---
  /*
  function funcionCarrito() {
    if (cantidad < 1) return;
    agregarAlCarrito({ ...productoSeleccionado, price: precioFinal(productoSeleccionado), cantidad });
    dispararSweetAlertBasico("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
    toast.success('Agregado al carrito con éxito');
  }

  function sumarContador() { setCantidad(cantidad + 1); }
  function restarContador() { if (cantidad > 1) setCantidad(cantidad - 1); }
  */

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!productoSeleccionado?.id) return <p>Producto no encontrado</p>;

  return (
    <div className="div-detalle py-4">
      <h1 className="fst-italic fs-3 mb-4">DETALLES DEL PRODUCTO</h1>
      <div className="detalle-container">
        <img
          className="detalle-imagen mx-auto mb-3"
          src={productoSeleccionado.imagen}
          alt={productoSeleccionado.name}
        />
        <div className="detalle-info">
          <h1 className="fs-2">{productoSeleccionado.name}</h1>
          <p>{productoSeleccionado.description}</p>
          {esOferta(productoSeleccionado) ? (
            <h6>
              <span className="precio-original">$ {productoSeleccionado.price}</span>{" "}
              <span className="precio-oferta">$ {precioFinal(productoSeleccionado)}</span>{" "}
              <span className="badge bg-danger">-{descuentoDe(productoSeleccionado)}%</span>
            </h6>
          ) : (
            <h6>$ {productoSeleccionado.price}</h6>
          )}

          {admin ? (
            <div className="d-flex justify-content-center align-items-center">
              <Link title="Editar Producto" to={`/admin/editarProducto/${id}`}>
                <Button className="mx-1 mb-2" variant="outline-primary">
                  <FaRegEdit size={24} />
                </Button>
              </Link>
              <Button
                title="Eliminar Producto"
                className="mx-1 mb-2"
                variant="outline-danger"
                onClick={dispararEliminar}
              >
                <FaRegTrashAlt size={20} />
              </Button>
              <Link to="/productos">
                <Button className="mx-1 mb-2" variant="outline-success">Ir a Productos</Button>
              </Link>
            </div>
          ) : (
            <div>
              {/* --- CARRITO (desactivado por ahora) ---
              <div className="d-flex align-items-center mb-2">
                <button className="me-3 btn btn-light" onClick={restarContador}>-</button>
                <span>{cantidad}</span>
                <button className="ms-3 btn btn-light" onClick={sumarContador}>+</button>
              </div>
              */}
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {/* --- CARRITO (desactivado por ahora)
                <Button
                  title="Agregar al carrito"
                  className="mx-1 mb-2"
                  variant="outline-primary"
                  onClick={funcionCarrito}
                >
                  <MdOutlineAddShoppingCart size={24} />
                </Button>
                <ToastContainer />
                */}
                <Button
                  as="a"
                  variant=""
                  className="btn-whatsapp mx-1 mb-2 d-inline-flex align-items-center gap-2"
                  href={urlWhatsApp(mensajeConsultaProducto(productoSeleccionado))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={20} /> Consultar por WhatsApp
                </Button>
                <Link className="mx-1 mb-2" to="/productos">
                  <Button variant="outline-success">Volver a Productos</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;
