import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Accordion, Button } from "react-bootstrap";
import "../styles/DetalleProducto.css";
import "../styles/BtnWhatsApp.css";
import { dispararSweetAlertBasico, dispararSweetAlertTrueFalse } from "../assets/SweetAlert";
import 'bootstrap/dist/css/bootstrap.min.css';
// --- CARRITO (desactivado por ahora, descomentar cuando se vuelva a usar) ---
// import { CarritoContext } from "../contexts/CarritoContext";
// import { ToastContainer, toast } from "react-toastify";
// import { MdOutlineAddShoppingCart } from "react-icons/md";
// -----------------------------------------------------------------------------
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { FaRegEdit, FaRegTrashAlt, FaWhatsapp } from "react-icons/fa";
import { descuentoDe, esOferta, precioFinal } from "../utils/precios";
import { parseColores } from "../utils/colores";
import { listaImagenes } from "../utils/imagenes";
import GaleriaProducto from "./GaleriaProducto";
import { mensajeConsultaProducto, urlWhatsApp } from "../config/contacto";

function ProductoDetalle() {
  // const { agregarAlCarrito } = useContext(CarritoContext); // CARRITO (si lo reactivás, importá también useContext de "react")
  const { admin } = useAuthContext();
  const { obtenerUnProducto, productoSeleccionado, eliminarProducto } = useProductosContext();
  const { id } = useParams();
  // const [cantidad, setCantidad] = useState(1); // CARRITO
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [indiceColor, setIndiceColor] = useState(0);
  const navigate = useNavigate();

  // Colores del producto (campo "colores", ver src/utils/colores.js)
  const colores = useMemo(
    () => parseColores(productoSeleccionado?.colores),
    [productoSeleccionado]
  );
  const colorElegido = colores[indiceColor] ?? colores[0];

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
    agregarAlCarrito({ ...productoSeleccionado, price: precioFinal(productoSeleccionado), color: colorElegido?.nombre, cantidad });
    dispararSweetAlertBasico("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
    toast.success('Agregado al carrito con éxito');
  }

  function sumarContador() { setCantidad(cantidad + 1); }
  function restarContador() { if (cantidad > 1) setCantidad(cantidad - 1); }
  */

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!productoSeleccionado?.id) return <p>Producto no encontrado</p>;

  const oferta = esOferta(productoSeleccionado);

  // El color elegido viaja en el mensaje de WhatsApp, junto al nombre del producto
  const productoConsulta = colorElegido
    ? { ...productoSeleccionado, name: `${productoSeleccionado.name} · Color: ${colorElegido.nombre}` }
    : productoSeleccionado;

  return (
    <div className="pd-pagina">
      <div className="pd-contenedor">
        <Link className="pd-volver" to="/productos">← Volver a productos</Link>

        <article className="pd-card">
          {/* ---------- Imagen ---------- */}
          <div className="pd-imagen-wrap">
            <GaleriaProducto
              key={productoSeleccionado.id}
              imagenes={listaImagenes(productoSeleccionado)}
              alt={productoSeleccionado.name}
            >
              {oferta && <span className="pd-badge-oferta">-{descuentoDe(productoSeleccionado)}%</span>}
            </GaleriaProducto>
          </div>

          {/* ---------- Información ---------- */}
          <div className="pd-info">
            {productoSeleccionado.category && (
              <span className="pd-categoria">{productoSeleccionado.category}</span>
            )}

            <h1 className="pd-nombre">{productoSeleccionado.name}</h1>

            <div className="pd-precio">
              <span className="pd-precio-actual">$ {precioFinal(productoSeleccionado)}</span>
              {oferta && (
                <>
                  <span className="precio-original">$ {productoSeleccionado.price}</span>
                  <span className="badge bg-danger">-{descuentoDe(productoSeleccionado)}%</span>
                </>
              )}
            </div>

            {/* ---------- Colores ---------- */}
            {colores.length > 0 && (
              <div>
                <p className="pd-colores-titulo">
                  Color: <strong>{colorElegido?.nombre}</strong>
                </p>
                <div className="pd-swatches" role="group" aria-label="Elegir color">
                  {colores.map((color, indice) => {
                    const activo = color === colorElegido;
                    return color.hex ? (
                      <button
                        key={`${color.nombre}-${indice}`}
                        type="button"
                        className={`pd-swatch ${activo ? "pd-swatch--activo" : ""}`}
                        style={{ backgroundColor: color.hex }}
                        title={color.nombre}
                        aria-label={color.nombre}
                        aria-pressed={activo}
                        onClick={() => setIndiceColor(indice)}
                      />
                    ) : (
                      <button
                        key={`${color.nombre}-${indice}`}
                        type="button"
                        className={`pd-color-texto ${activo ? "pd-color-texto--activo" : ""}`}
                        aria-pressed={activo}
                        onClick={() => setIndiceColor(indice)}
                      >
                        {color.nombre}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ---------- Descripción ---------- */}
            {productoSeleccionado.description && (
              <Accordion defaultActiveKey="0" className="pd-acordeon">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Descripción</Accordion.Header>
                  <Accordion.Body>{productoSeleccionado.description}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}

            {/* ---------- Acciones ---------- */}
            {admin ? (
              <div className="d-flex flex-wrap justify-content-start align-items-center">
                <Link title="Editar Producto" to={`/admin/editarProducto/${id}`}>
                  <Button className="me-2 mb-2" variant="outline-primary">
                    <FaRegEdit size={24} />
                  </Button>
                </Link>
                <Button
                  title="Eliminar Producto"
                  className="me-2 mb-2"
                  variant="outline-danger"
                  onClick={dispararEliminar}
                >
                  <FaRegTrashAlt size={20} />
                </Button>
                <Link to="/productos">
                  <Button className="mb-2" variant="outline-success">Ir a Productos</Button>
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
                <Button
                  title="Agregar al carrito"
                  className="pd-cta mb-2"
                  variant="outline-primary"
                  onClick={funcionCarrito}
                >
                  <MdOutlineAddShoppingCart size={24} /> Agregar al carrito
                </Button>
                <ToastContainer />
                */}
                <Button
                  as="a"
                  variant=""
                  className="btn-whatsapp pd-cta d-flex align-items-center justify-content-center gap-2"
                  href={urlWhatsApp(mensajeConsultaProducto(productoConsulta))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={22} /> Consultar por WhatsApp
                </Button>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

export default ProductoDetalle;
