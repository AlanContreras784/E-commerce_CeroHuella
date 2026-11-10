import { Container, Image, Row } from "react-bootstrap";
import video from "../assets/video/ROCK&VIDARECICLA.mp4"

// Foto que se muestra solo en celular (menos de 768px), debajo de cada párrafo.
// En pantallas más grandes las fotos siguen como antes (la de arriba a la derecha y la columna lateral).
function FotoCelular({ src, alt }) {
  return (
    <div className="d-md-none col-10 mx-auto pb-3">
      <div className="card" style={{ border: "1px solid #7cb744fa" }}>
        <Image src={src} className="card-img-top" alt={alt} />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Container fluid className="">
      <Row className="">
        <div className="col-md-9 clearfix container-fluid">
          <h1 className="py-3 text-center" >Sobre Nosotros</h1>
          <div className=" col-12 col-md-11 col-lg-9  bg-gradiente py-3 mx-auto my-3">
            <video className="w-100 my-2"
            src={video}
            poster="https://i.postimg.cc/gJsdWRfx/R&V_Logo_Verde_1024(2).png"
            controls
          ></video>
          </div>
          <Image
            src="https://i.postimg.cc/26YXphyP/imagennosotros.jpg"
            className="col-md-4 float-md-end mb-4 ms-md-5 d-none d-md-block"
            alt="..."
          />

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
          <FotoCelular src="https://i.postimg.cc/XqRj3s5V/campa-a-De-Residuos.jpg" alt="Campaña de residuos" />

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
          <FotoCelular src="https://i.postimg.cc/GmJLwJmC/mes-Del-Reciclaje.jpgz" alt="Mes del reciclaje" />

          <h2 className="p-3">Únete a Nosotros</h2>
        </div>
        {/* Columna lateral: solo en tablet y pantallas grandes (en celular las fotos van debajo de cada párrafo) */}
        <aside className="d-none d-md-block col-sm-12 col-lg-3 pb-3 ">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-1 g-4 justify-content-center align-items-center">
            <div className="col-10 col-lg-12 col-md-6 ">
              <div className="card">
                <Image src="https://i.postimg.cc/XqRj3s5V/campa-a-De-Residuos.jpg" className="card-img-top" alt=".../"/>
              </div>
            </div>
            <div className=" col-10 col-md-6 col-lg-12">
              <div className="card">
                <Image src="https://i.postimg.cc/W481rmBn/bolsas-De-Dormir.jpg" className="card-img-top " alt="..."/>
              </div>
            </div>
            {/* <div className="col-10 col-md-6 col-lg-12">
              <div className="card">
                <Image src="https://i.postimg.cc/cHD6q7TH/amemos-sin-juzgar.jpg" className="card-img-top" alt="..."/>
              </div>
            </div> */}
            <div className="col-10 col-md-6 col-lg-12">
              <div className="card">
                <Image src="https://i.postimg.cc/GmJLwJmC/mes-Del-Reciclaje.jpg" className="card-img-top" alt="..."/>
              </div>
            </div>
          </div>
        </aside>
      </Row>
    </Container>
  );
}
