import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import CardProducto from "./CardProducto";
import "../styles/CarouselProductos.css";

// Cantidad de cards por slide según el ancho de pantalla
function calcularItemsPorSlide() {
  if (typeof window === "undefined") return 4;
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1200) return 3;
  return 4;
}

function useItemsPorSlide() {
  const [items, setItems] = useState(calcularItemsPorSlide);

  useEffect(() => {
    const onResize = () => setItems(calcularItemsPorSlide());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return items;
}

function CarouselProductos({ titulo, productos = [] }) {
  const itemsPorSlide = useItemsPorSlide();

  // Si no hay productos, no se muestra la sección
  if (!productos.length) return null;

  // Agrupa los productos en slides de N cards
  const slides = [];
  for (let i = 0; i < productos.length; i += itemsPorSlide) {
    slides.push(productos.slice(i, i + itemsPorSlide));
  }

  return (
    <section className="seccion-productos">
      <h2 className="seccion-productos__titulo">{titulo}</h2>

      {/* key: reinicia el carrusel cuando cambia la cantidad de cards por slide */}
      <Carousel
        key={itemsPorSlide}
        className="carousel-productos"
        interval={null}
        indicators={slides.length > 1}
        controls={slides.length > 1}
        variant="dark"
      >
        {slides.map((grupo, indice) => (
          <Carousel.Item key={indice}>
            <div className="carousel-productos__fila">
              {grupo.map((producto) => (
                <CardProducto key={producto.id} producto={producto} />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}

export default CarouselProductos;
