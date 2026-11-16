import { Col, Container, Image, Row } from "react-bootstrap";
import video from "../assets/video/accionAmbiental.mp4";
import video1 from "../assets/video/jornadaSemanal.mp4"
import "../styles/About.css";

// Foto o video que se muestra solo en celular (menos de 768px), debajo de cada párrafo.
function FotoCelular({ src, alt , type}) {
   // Detecta si es video por la prop 'type' o por la extensión del archivo
  const isVideo =
    type === "video" ||
    (typeof src === "string" && /\.(mp4|webm|ogg|mov)$/i.test(src));
  return (
    <div className="d-md-none col-10 mx-auto pb-3">
      <div className="card overflow-hidden" style={{ border: "1px solid #7cb744fa" }}>
        {isVideo ? (
          <video
            src={src}
            controls
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="video-vertical"
            aria-label={alt}
          />
        ) : (
          <Image src={src} className="card-img-top" alt={alt} />
        )}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Container fluid>
      <Row>
        {/* ================= Zona principal (título + videos + textos) ================= */}
        <Col xs={12} xl={9}>
          

          {/* ----- Fila 1: video 1 a la izquierda | textos a la derecha ----- */}
          <Row className="align-items-start mt-3">
            <Col xs={12} lg={5} className="mb-4">
              <div className=" py-3">
                <video
                  src={video}
                  poster="https://i.postimg.cc/gJsdWRfx/R&V_Logo_Verde_1024(2).png"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="video-vertical"
                  aria-label="Video de Acción Ambiental"
                ></video>
              </div>
            </Col>

            <Col xs={12} lg={7}>
            <h1 className="pt-3 pb-4 text-center">Sobre Nosotros</h1>
              <h2 className="pb-3 px-3">¿Quiénes Somos?</h2>
              <p className="p-3">
                En Cero Huella, somos un grupo de apasionados por la sostenibilidad
                y la protección del medio ambiente. Creemos que cada uno de nosotros
                puede hacer la diferencia en la lucha contra el cambio climático y
                la contaminación, y estamos aquí para inspirarte a tomar acción.
              </p>
              <FotoCelular src="https://i.postimg.cc/26YXphyP/imagennosotros.jpg" alt="Equipo de Cero Huella" />

              <h2 className="p-3">Nuestra Misión</h2>
              <p className="p-3">
                Nuestra misión es promover la economía circular como una solución
                viable para reducir nuestro impacto en el planeta. A través de la
                educación y la concienciación, buscamos empoderar a las personas y
                comunidades a adoptar hábitos más sostenibles y responsables.
                Creemos que el reciclaje y el uso de productos que contaminen menos
                son pasos fundamentales hacia un futuro más limpio y saludable.
              </p>
              <FotoCelular src={video1} type="video" alt="Jornada semanal" />
            </Col>
          </Row>

          {/* ----- Fila 2: textos a la izquierda | video 2 a la derecha ----- */}
          <Row className="align-items-start">
            <Col xs={12} lg={7}>
              <h2 className="p-3">Nuestros Valores</h2>
              <p className="p-3">
                Sostenibilidad: Fomentamos prácticas que minimizan el desperdicio y
                promueven el uso responsable de los recursos. Educación:
                Proporcionamos información accesible y relevante para ayudar a todos
                a comprender la importancia de la economía circular. Comunidad:
                Valoramos la colaboración y la participación activa, creando un
                espacio donde todos puedan compartir ideas y experiencias.
              </p>
              <FotoCelular src="https://i.postimg.cc/W481rmBn/bolsas-De-Dormir.jpg" alt="Bolsas de dormir" />

              <h2 className="p-3 pt-5">Lo Que Hacemos</h2>
              <p className="p-3">
                En Cero Huella, no solo ofrecemos recursos, guías y consejos
                prácticos para ayudarte a reducir tu huella ecológica, sino que
                también contamos con una tienda donde puedes encontrar productos
                sostenibles y eco-amigables. Desde artículos de uso diario hasta
                opciones de embalaje y limpieza, todos nuestros productos están
                cuidadosamente seleccionados para alinearse con nuestros
                principios de sostenibilidad.
              </p>
              <FotoCelular src="https://i.postimg.cc/GmJLwJmC/mes-Del-Reciclaje.jpg" alt="Mes del reciclaje" />

              <h2 className="p-3">Únete a Nosotros</h2>
            </Col>

            {/* En celular este video no se muestra aquí: va debajo de "Nuestra Misión" */}
            <Col xs={12} lg={5} className="d-none d-md-block mb-4">
              <div className=" py-3">
                <video
                  src={video1}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="video-vertical"
                  aria-label="Jornada semanal"
                ></video>
              </div>
            </Col>
          </Row>
        </Col>

        {/* ================= Aside: columna derecha en escritorio, fila debajo en tablet ================= */}
        <aside className="d-none d-md-block col-12 col-xl-3 pb-3">
          <div className="row row-cols-1 row-cols-md-3 row-cols-xl-1 g-4 justify-content-center align-items-center">
            <div className="col">
              <div className="card">
                <Image src="https://i.postimg.cc/XqRj3s5V/campa-a-De-Residuos.jpg" className="card-img-top" alt="Campaña de residuos" />
              </div>
            </div>
            <div className="col">
              <div>
                <Image src="https://i.postimg.cc/W481rmBn/bolsas-De-Dormir.jpg" className="card-img-top" alt="Bolsas de dormir" />
              </div>
            </div>
            <div className="col">
              <div className="card">
                <Image src="https://i.postimg.cc/GmJLwJmC/mes-Del-Reciclaje.jpg" className="card-img-top" alt="Mes del reciclaje" />
              </div>
            </div>
          </div>
        </aside>
      </Row>
    </Container>
  );
}
