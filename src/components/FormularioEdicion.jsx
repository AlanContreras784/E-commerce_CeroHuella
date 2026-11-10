import { Alert, Button, Card, Container, FloatingLabel, Form } from "react-bootstrap";
import { useProductosContext } from "../contexts/ProductosContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { dispararSweetAlertBasico } from "../assets/SweetAlert";
import { useAuthContext } from "../contexts/AuthContext";
import { CATEGORIAS } from "../utils/categorias";

function FormularioEdicion() {
  const { admin } = useAuthContext();
  const { productoSeleccionado, obtenerUnProducto, editarProducto } = useProductosContext();
  const { id } = useParams();

  const [producto, setProducto] = useState(productoSeleccionado);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    obtenerUnProducto(id)
      .then(() => setCargando(false))
      .catch(() => {
        setError("Hubo un problema al cargar el producto.");
        setCargando(false);
      });
  }, []);

  // 👉 Redirección segura luego de hooks
  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  if (cargando) return <p>Cargando...</p>;

  const validarFormulario = () => {
    if (!producto.name.trim()) return "El nombre es obligatorio.";
    if (!producto.price || producto.price <= 0) return "El precio debe ser mayor a 0.";
    if (!producto.description.trim() || producto.description.length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    if (!producto.imagen.trim()) return "La url de la imagen no debe estar vacía";
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto({ ...producto, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();

    if (validarForm === true) {
      editarProducto(producto)
        .then(() => {
          dispararSweetAlertBasico("OK", "Producto actualizado correctamente.", "success", "Cerrar");
          navigate("/productos/" + id);
        })
        .catch((error) => {
          dispararSweetAlertBasico(
            "Error",
            error.message,
            "error",
            "Cerrar"
          );
        });
    } else {
      dispararSweetAlertBasico("Error en el formulario", validarForm, "error", "Cerrar");
      setError(validarForm);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center align-items-center mb-5" style={{ maxWidth: 400 }}>
      <Card className="shadow-lg" style={{ width: "24rem" }}>
        <Card.Body>
          <Card.Title className="mb-3 text-center">Editar Producto</Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-start">
              <FloatingLabel label="Nombre">
                <Form.Control
                  type="text"
                  name="name"
                  value={producto.name}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <FloatingLabel label="Url Imagen">
                <Form.Control
                  type="text"
                  name="imagen"
                  value={producto.imagen}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <FloatingLabel label="Precio">
                <Form.Control
                  type="number"
                  step={0.01}
                  min="0"
                  name="price"
                  value={producto.price}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <FloatingLabel label="Categoria">
                <Form.Select
                  name="category"
                  value={(producto.category || "").toLowerCase()}
                  onChange={handleChange}
                >
                  <option value="">Seleccioná una categoría</option>
                  {CATEGORIAS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                  {producto.category &&
                    !CATEGORIAS.some((c) => c.value === producto.category.toLowerCase()) && (
                      <option value={producto.category.toLowerCase()}>{producto.category}</option>
                    )}
                </Form.Select>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <FloatingLabel label="Descuento (%)">
                <Form.Control
                  type="number"
                  min="0"
                  max="99"
                  name="descuento"
                  value={producto.descuento ?? 0}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Check
                type="switch"
                id="destacado"
                name="destacado"
                label="Producto destacado"
                checked={!!producto.destacado}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <FloatingLabel label="Descripcion">
                <Form.Control
                  as="textarea"
                  name="description"
                  value={producto.description}
                  onChange={handleChange}
                />
              </FloatingLabel>
            </Form.Group>

            <Button type="submit" className="mb-2" variant="outline-primary">
              Editar Producto
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default FormularioEdicion;