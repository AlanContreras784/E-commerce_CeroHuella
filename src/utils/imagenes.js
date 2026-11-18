// Fotos de un producto.
// - "imagen" es la foto principal (la de siempre: listados, tarjetas y vista previa de WhatsApp).
// - "imagenes" es opcional: más fotos, un enlace por línea (o separados por coma).
// La galería muestra primero "imagen" y después las de "imagenes", sin repetidas.
export function listaImagenes(producto) {
  const extra = Array.isArray(producto?.imagenes)
    ? producto.imagenes
    : typeof producto?.imagenes === "string"
      ? producto.imagenes.split(/[\s,]+/)
      : [];

  const todas = [producto?.imagen, ...extra]
    .map((src) => String(src ?? "").trim())
    .filter(Boolean);

  return [...new Set(todas)];
}
