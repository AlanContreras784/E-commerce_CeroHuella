import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { dispararSweetAlertBasico, dispararSweetAlertTrueFalse } from "../assets/SweetAlert";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CarritoContext } from "../contexts/CarritoContext";
import { Button } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { ToastContainer, toast } from "react-toastify";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { descuentoDe, esOferta, precioFinal } from "../utils/precios";

function ProductoDetalle() {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { admin } = useAuthContext();
  const { obtenerUnProducto, productoSeleccionado, eliminarProducto } = useProductosContext();
  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
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

  // Funciones carrito
  function funcionCarrito() {
    if (cantidad < 1) return;
    agregarAlCarrito({ ...productoSeleccionado, price: precioFinal(productoSeleccionado), cantidad });
    dispararSweetAlertBasico("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
    toast.success('Agregado al carrito con éxito');
  }

  function sumarContador() { setCantidad(cantidad + 1); }
  function restarContador() { if (cantidad > 1) setCantidad(cantidad - 1); }

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
              <div className="d-flex align-items-center mb-2">
                <button className="me-3 btn btn-light" onClick={restarContador}>-</button>
                <span>{cantidad}</span>
                <button className="ms-3 btn btn-light" onClick={sumarContador}>+</button>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  title="Agregar al carrito"
                  className="mx-1 mb-2"
                  variant="outline-primary"
                  onClick={funcionCarrito}
                >
                  <MdOutlineAddShoppingCart size={24} />
                </Button>
                <ToastContainer />
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
