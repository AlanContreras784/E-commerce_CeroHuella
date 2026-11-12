import { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {
  FaHandsHelping,
  FaInstagram,
  FaMapMarkerAlt,
  FaQuoteLeft,
  FaRobot,
  FaSeedling,
  FaTools,
  FaWhatsapp,
} from "react-icons/fa";
import {
  CATEGORIAS_TALLERES,
  COMENTARIOS,
  CONTACTO_TALLERES,
  IMAGEN_PORTADA,
  TALLERES,
} from "../data/talleres";
import "../styles/BtnWhatsApp.css";
import "../styles/Talleres.css";

// Ícono que se muestra cuando un taller todavía no tiene imagen
const ICONOS = {
  oficios: FaTools,
  sustentables: FaSeedling,
  peques: FaRobot,
  solidarios: FaHandsHelping,
};

const urlWhatsApp = (mensaje) =>
  `https://wa.me/${CONTACTO_TALLERES.whatsapp}?text=${encodeURIComponent(mensaje)}`;

function ImagenTaller({ src, alt, categoria }) {
  const [fallo, setFallo] = useState(false);
  const Icono = ICONOS[categoria] || FaSeedling;

  // Sin imagen (o si el enlace no carga) se muestra un ícono para no dejar un hueco roto
  if (!src || fallo) {
    return (
      <div className="taller-imagen taller-imagen--vacia" aria-hidden="true">
        <Icono size={56} />
      </div>
    );
  }

  return (
    <img
      className="taller-imagen"
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFallo(true)}
    />
  );
}

export default function Talleres() {
  const [categoria, setCategoria] = useState("todos");

  const visibles =
    categoria === "todos"
      ? TALLERES
      : TALLERES.filter((taller) => taller.categoria === categoria);

  return (
    <div className="talleres-pagina">
      {/* ---------- Portada ---------- */}
      <section
        className={`talleres-portada ${IMAGEN_PORTADA ? "talleres-portada--con-imagen" : ""}`}
        style={IMAGEN_PORTADA ? { "--portada": `url("${IMAGEN_PORTADA}")` } : undefined}
      >
        <h1>Nuestros talleres</h1>
        <p>
          Aprendé haciendo: oficios, sustentabilidad y tecnología para cuidar el
          ambiente y tu hogar.
        </p>
        <div className="talleres-portada__acciones">
          <Button
            as="a"
            variant=""
            className="btn-whatsapp d-inline-flex align-items-center gap-2"
            href={urlWhatsApp("Hola! Quisiera consultar por los próximos talleres.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={20} /> Consultar próximas fechas
          </Button>
          <Button
            as="a"
            variant="outline-light"
            className="d-inline-flex align-items-center gap-2"
            href={CONTACTO_TALLERES.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={20} /> Seguinos en Instagram
          </Button>
        </div>
      </section>

      <Container>
        {/* ---------- Filtros ---------- */}
        <div className="talleres-filtros" role="group" aria-label="Filtrar talleres">
          {CATEGORIAS_TALLERES.map((cat) => (
            <Button
              key={cat.id}
              size="sm"
              variant={categoria === cat.id ? "success" : "outline-success"}
              onClick={() => setCategoria(cat.id)}
            >
              {cat.nombre}
            </Button>
          ))}
        </div>

        {/* ---------- Talleres ---------- */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {visibles.map((taller) => (
            <Col key={taller.id}>
              <Card className="taller-card rounded-4">
                <ImagenTaller
                  src={taller.imagen}
                  alt={taller.titulo}
                  categoria={taller.categoria}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{taller.titulo}</Card.Title>
                  <Card.Text>{taller.descripcion}</Card.Text>
                  {taller.etiquetas?.length > 0 && (
                    <div className="taller-etiquetas">
                      {taller.etiquetas.map((etiqueta) => (
                        <span key={etiqueta} className="taller-etiqueta">
                          {etiqueta}
                        </span>
                      ))}
                    </div>
                  )}
                  <Button
                    as="a"
                    variant=""
                    className="btn-whatsapp mt-auto d-inline-flex align-items-center justify-content-center gap-2"
                    href={urlWhatsApp(
                      `Hola! Quisiera consultar por el taller "${taller.titulo}". ¿Cuándo es la próxima fecha?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp size={18} /> Consultar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* ---------- Dónde y cómo ---------- */}
        <section className="talleres-info">
          <p className="mb-2 d-flex align-items-center justify-content-center gap-2">
            <FaMapMarkerAlt /> <strong>{CONTACTO_TALLERES.lugar}</strong>
          </p>
          <p className="mb-0">
            Las fechas y los cupos cambian: escribinos por WhatsApp y te contamos
            cuándo es el próximo.
          </p>
        </section>

        {/* ---------- Comentarios ---------- */}
        <section className="talleres-comentarios">
          <h2>Lo que dicen quienes participaron</h2>

          {COMENTARIOS.length > 0 ? (
            <Row xs={1} md={2} lg={3} className="g-4">
              {COMENTARIOS.map((comentario, indice) => (
                <Col key={indice}>
                  <figure className="comentario-card m-0">
                    <FaQuoteLeft className="comentario-card__comilla" aria-hidden="true" />
                    <blockquote className="mb-0">{comentario.texto}</blockquote>
                    <footer>
                      <strong>{comentario.nombre}</strong>
                      {comentario.taller && <span>{comentario.taller}</span>}
                    </footer>
                  </figure>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="comentarios-vacio">
              <p className="mb-0">
                Muy pronto vas a leer acá las experiencias de quienes ya pasaron por
                nuestros talleres. ¿Hiciste alguno? ¡Contanos cómo te fue!
              </p>
            </div>
          )}

          <div className="mt-4">
            <Button
              as="a"
              variant=""
              className="btn-whatsapp d-inline-flex align-items-center gap-2"
              href={urlWhatsApp(
                "Hola! Hice un taller y quisiera dejar mi comentario sobre cómo me fue."
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={20} /> Dejar mi comentario
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
