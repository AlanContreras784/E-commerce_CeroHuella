// Helpers para productos destacados y ofertas.
// Campos esperados en cada producto (opcionales):
//   destacado: boolean  -> aparece en el carrusel "Productos destacados"
//   descuento: number   -> porcentaje (1-99). Si es > 0, aparece en "Ofertas"

export const descuentoDe = (producto) => {
  const d = Number(producto?.descuento);
  return Number.isFinite(d) && d > 0 && d < 100 ? d : 0;
};

export const esOferta = (producto) => descuentoDe(producto) > 0;

export const esDestacado = (producto) =>
  producto?.destacado === true || producto?.destacado === "true";

export const precioFinal = (producto) => {
  const precio = Number(producto?.price) || 0;
  const d = descuentoDe(producto);
  return d ? Math.round(precio * (1 - d / 100) * 100) / 100 : precio;
};
