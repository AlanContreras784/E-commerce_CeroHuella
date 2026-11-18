import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CardProducto from "./CardProducto";
import "../styles/CarouselProductos.css";

// Cuántas tarjetas se ven a la vez según el ancho de la pantalla
function calcularVisibles() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1200) return 2;
  return 3;
}

function useVisibles() {
  const [visibles, setVisibles] = useState(calcularVisibles);

  useEffect(() => {
    const alCambiar = () => setVisibles(calcularVisibles());
    window.addEventListener("resize", alCambiar);
    return () => window.removeEventListener("resize", alCambiar);
  }, []);

  return visibles;
}

const comportamiento = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

// Fila de productos: se ven 3 a la vez (2 en tablet, 1 en celular).
// Si hay más, aparecen flechas y puntitos para ir de a un producto; en celular también se desliza con el dedo.
function CarouselProductos({ titulo, productos = [] }) {
  const visibles = useVisibles();
  const pista = useRef(null);
  const [posicion, setPosicion] = useState({ alInicio: true, alFinal: false, activo: 0 });
  const total = productos.length;

  // Distancia de una tarjeta a la siguiente (ancho de la tarjeta + espacio entre ellas)
  const medirPaso = useCallback(() => {
    const el = pista.current;
    const item = el?.firstElementChild;
    if (!el || !item) return 0;
    return item.offsetWidth + (parseFloat(window.getComputedStyle(el).columnGap) || 0);
  }, []);

  const actualizar = useCallback(() => {
    const el = pista.current;
    if (!el) return;
    const paso = medirPaso();
    setPosicion({
      alInicio: el.scrollLeft <= 2,
      alFinal: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
      activo: paso ? Math.round(el.scrollLeft / paso) : 0,
    });
  }, [medirPaso]);

  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    actualizar();
    el.addEventListener("scroll", actualizar, { passive: true });
    window.addEventListener("resize", actualizar);
    return () => {
      el.removeEventListener("scroll", actualizar);
      window.removeEventListener("resize", actualizar);
    };
  }, [actualizar, total, visibles]);

  const mover = (direccion) =>
    pista.current?.scrollBy({ left: direccion * medirPaso(), behavior: comportamiento() });

  const irA = (indice) =>
    pista.current?.scrollTo({ left: indice * medirPaso(), behavior: comportamiento() });

  // Si no hay productos, no se muestra la sección
  if (!total) return null;

  const hayMas = total > visibles;
  const posiciones = total - visibles + 1; // cuántos "lugares" distintos puede ocupar la fila

  return (
    <section className="seccion-productos" aria-label={titulo}>
      <h2 className="seccion-productos__titulo">{titulo}</h2>

      <div className="slider-productos" style={{ "--visibles": Math.min(total, visibles) }}>
        {hayMas && (
          <button
            type="button"
            className="slider-productos__flecha slider-productos__flecha--izq"
            aria-label="Productos anteriores"
            disabled={posicion.alInicio}
            onClick={() => mover(-1)}
          >
            <FaChevronLeft />
          </button>
        )}

        <div
          ref={pista}
          className="slider-productos__pista"
          role="region"
          aria-label={`${titulo}: lista de productos`}
          tabIndex={0}
        >
          {productos.map((producto) => (
            <div className="slider-productos__item" key={producto.id}>
              <CardProducto producto={producto} />
            </div>
          ))}
        </div>

        {hayMas && (
          <button
            type="button"
            className="slider-productos__flecha slider-productos__flecha--der"
            aria-label="Productos siguientes"
            disabled={posicion.alFinal}
            onClick={() => mover(1)}
          >
            <FaChevronRight />
          </button>
        )}
      </div>

      {hayMas && posiciones <= 10 && (
        <div className="slider-productos__puntos" role="group" aria-label="Ir a una posición de la lista">
          {Array.from({ length: posiciones }, (_, indice) => (
            <button
              key={indice}
              type="button"
              className={`slider-productos__punto ${indice === posicion.activo ? "slider-productos__punto--activo" : ""}`}
              aria-label={`Ir a la posición ${indice + 1} de ${posiciones}`}
              aria-current={indice === posicion.activo}
              onClick={() => irA(indice)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default CarouselProductos;
