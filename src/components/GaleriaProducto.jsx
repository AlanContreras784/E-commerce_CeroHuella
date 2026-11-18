import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Minigalería: una foto grande, flechas y puntitos. En celular también se desliza con el dedo.
// "children" se dibuja encima de la foto (por ejemplo la etiqueta de descuento).
export default function GaleriaProducto({ imagenes = [], alt = "", children }) {
  const [indice, setIndice] = useState(0);
  const inicioX = useRef(null);

  const total = imagenes.length;
  const actual = Math.min(indice, Math.max(total - 1, 0));

  const ir = (nuevo) => setIndice((nuevo + total) % total);

  // Precarga la foto siguiente y la anterior para que el cambio sea inmediato
  useEffect(() => {
    if (total < 2) return;
    [actual + 1, actual - 1].forEach((n) => {
      const precarga = new Image();
      precarga.src = imagenes[(n + total) % total];
    });
  }, [actual, imagenes, total]);

  const alTocar = (e) => { inicioX.current = e.touches[0].clientX; };
  const alSoltar = (e) => {
    if (inicioX.current === null || total < 2) return;
    const diferencia = e.changedTouches[0].clientX - inicioX.current;
    inicioX.current = null;
    if (Math.abs(diferencia) > 40) ir(actual + (diferencia < 0 ? 1 : -1));
  };

  return (
    <div className="pd-galeria">
      <div className="pd-galeria__marco" onTouchStart={alTocar} onTouchEnd={alSoltar}>
        {children}
        {total > 0 ? (
          <img
            className="pd-imagen"
            src={imagenes[actual]}
            alt={total > 1 ? `${alt} (foto ${actual + 1} de ${total})` : alt}
          />
        ) : (
          <div className="pd-imagen pd-imagen--vacia" role="img" aria-label="Sin foto" />
        )}

        {total > 1 && (
          <>
            <button
              type="button"
              className="pd-galeria__flecha pd-galeria__flecha--izq"
              aria-label="Foto anterior"
              onClick={() => ir(actual - 1)}
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              className="pd-galeria__flecha pd-galeria__flecha--der"
              aria-label="Foto siguiente"
              onClick={() => ir(actual + 1)}
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="pd-galeria__puntos" role="group" aria-label="Elegir foto">
          {imagenes.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`pd-galeria__punto ${i === actual ? "pd-galeria__punto--activo" : ""}`}
              aria-label={`Ver foto ${i + 1} de ${total}`}
              aria-current={i === actual}
              onClick={() => setIndice(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
