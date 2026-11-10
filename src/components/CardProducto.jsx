import { Card, Button } from "react-bootstrap";
import "../styles/Productos.css";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { descuentoDe, esDestacado, esOferta, precioFinal } from "../utils/precios";
import { mensajeConsultaProducto, urlWhatsApp } from "../config/contacto";

function CardProducto({ producto }) {
    const oferta = esOferta(producto);

    return (
        <Card className="producto-card rounded-4">
            {oferta && <span className="badge-oferta">-{descuentoDe(producto)}%</span>}
            {esDestacado(producto) && <span className="badge-destacado">★ Destacado</span>}
            <Card.Body className="p-0">
                <img
                    className="producto-image mb-2 rounded-top-4 card-img-top"
                    src={producto.imagen}
                    alt={producto.name}
                />
                <Card.Title><h5>{producto.name}</h5></Card.Title>
                <Card.Subtitle>
                    {oferta ? (
                        <p>
                            <span className="precio-original">$ {producto.price}</span>{" "}
                            <span className="precio-oferta">$ {precioFinal(producto)}</span>
                        </p>
                    ) : (
                        <p>$ {producto.price}</p>
                    )}
                </Card.Subtitle>
                <div className="producto-acciones">
                    <Link to={"/productos/" + producto.id}>
                        <Button variant="outline-success">Ver detalles</Button>
                    </Link>
                    <Button
                        as="a"
                        variant="success"
                        className="boton-whatsapp-card"
                        href={urlWhatsApp(mensajeConsultaProducto(producto))}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={"Consultar por " + producto.name + " por WhatsApp"}
                        title="Consultar por WhatsApp"
                    >
                        <FaWhatsapp />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CardProducto;
