import Carousel from 'react-bootstrap/Carousel';
import imagen1 from '../assets/img/plantas_1920.jpg'
import imagen2 from '../assets/img/equipoMejorado2.jpg';
import imagen3 from '../assets/img/carousel_03.jpg';
import imagenRyV from '../assets/img/R&V Logo Verde 1024(2).png'
import '../styles/Carousel.css'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function CarouselInicio() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src="https://i.postimg.cc/sxt8pfG9/reutilizables_carrusel.jpg" alt="" />
        <Carousel.Caption className='bottom-10'>
          <h1 className="text-center mx-auto">UN COMPROMISO CON EL PLANETA</h1>
          <img className="logoRockVerde img-fluid w-25 mx-auto mb-2" src={imagenRyV} alt="" />
          <div className="divBlur text-center mx-auto pb-3">
            <p className="p-3">
              Innovación que respeta el medio ambiente. Creamos piezas únicas que
              minimizan nuestra huella ecológica.
            </p>
            <Button as={Link} to="/productos" variant="success" aria-label="nuestros productos">
              NUESTROS PRODUCTOS
            </Button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          alt="Equipo de Cero Huella trabajando en una jornada"
          src="https://i.postimg.cc/fRDDqHnT/equipo2.webp"
          className=' w-100'
          style={{ objectPosition: "center top" }} 
        />
        <Carousel.Caption className='caption-portada'>
          <h3>Un equipo que se une por el ambiente</h3>
          <p>Personas comprometidas que trabajan codo a codo para cuidar el planeta y a nuestra comunidad.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://i.postimg.cc/Y9cFD0cM/Whats-App-Image-2026-11-11-at-9-39-29-PM.jpg" alt="Taller de oficios y tecnología en Cero Huella" 
        style={{ objectPosition: "center bottom" }}
        />
        <Carousel.Caption>
          <h3>Talleres de oficios y tecnología</h3>
          <p>
            Electricidad, carpintería, construcción en seco, herrería, robótica y más.
            Aprendé haciendo, en clases prácticas.
          </p>
          <Button as={Link} to="/talleres" variant="success" aria-label="Ver todos los talleres">
            VER TALLERES
          </Button>
        </Carousel.Caption>
      </Carousel.Item>

      {/* <Carousel.Item>
        <img src='https://i.postimg.cc/sxt8pfG9/reutilizables_carrusel.jpg' alt="Artículos biodegradables" />
        <Carousel.Caption>
          <h3>Biodegradables</h3>
          <p>Artículos fabricados con materiales que se descomponen sin dañar el medio ambiente.</p>
        </Carousel.Caption>
      </Carousel.Item> */}

      {/* <Carousel.Item>
        <img src={imagen3} alt="Productos sostenibles" />
        <Carousel.Caption>
          <h3>Productos Sostenibles</h3>
          <p>Que promueven la economía circular y reducen el impacto ambiental.</p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
}

export default CarouselInicio;