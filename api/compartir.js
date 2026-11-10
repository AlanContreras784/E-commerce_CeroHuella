// Función de Vercel: https://TU-SITIO/compartir/ID
// Devuelve una página mínima con las etiquetas que WhatsApp lee para armar la
// vista previa (nombre, precio y foto del producto) y redirige a la página real.

const API_PRODUCTOS =
  process.env.API_PRODUCTOS_URL ||
  "https://api-productos-usuarios-node.vercel.app/api/products";
const SITIO = process.env.SITIO_URL || "https://e-commerce-cero-huella.vercel.app";

const esc = (valor) =>
  String(valor ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Misma lógica que src/utils/precios.js
const descuentoDe = (p) => {
  const d = Number(p?.descuento);
  return Number.isFinite(d) && d > 0 && d < 100 ? d : 0;
};
const precioFinal = (p) => {
  const precio = Number(p?.price) || 0;
  const d = descuentoDe(p);
  return d ? Math.round(precio * (1 - d / 100) * 100) / 100 : precio;
};

export default async function handler(req, res) {
  const id = String(req.query.id || "").trim();
  const destino = `${SITIO}/productos/${encodeURIComponent(id)}`;
  const urlCompartida = `${SITIO}/compartir/${encodeURIComponent(id)}`;

  let producto = null;
  try {
    if (id) {
      const respuesta = await fetch(`${API_PRODUCTOS}/${encodeURIComponent(id)}`);
      if (respuesta.ok) {
        const datos = await respuesta.json();
        producto = datos.payload || null;
      }
    }
  } catch (error) {
    producto = null;
  }

  let titulo = "Cero Huella";
  let descripcion = "Productos ecológicos y sostenibles.";
  let imagen = "";

  if (producto) {
    const d = descuentoDe(producto);
    const precio = d
      ? `$ ${precioFinal(producto)} (${d}% de descuento, antes $ ${producto.price})`
      : `$ ${producto.price}`;
    titulo = `${producto.name} | Cero Huella`;
    descripcion = `Precio: ${precio}`;
    if (typeof producto.imagen === "string" && /^https?:\/\//.test(producto.imagen)) {
      imagen = producto.imagen;
    }
  }

  const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>${esc(titulo)}</title>
  <meta name="description" content="${esc(descripcion)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Cero Huella">
  <meta property="og:title" content="${esc(titulo)}">
  <meta property="og:description" content="${esc(descripcion)}">
  <meta property="og:url" content="${esc(urlCompartida)}">
${imagen ? `  <meta property="og:image" content="${esc(imagen)}">\n  <meta property="og:image:alt" content="${esc(producto.name)}">` : ""}
  <meta name="twitter:card" content="summary_large_image">
  <meta http-equiv="refresh" content="0;url=${esc(destino)}">
</head>
<body>
  <script>location.replace(${JSON.stringify(destino).replace(/</g, "\\u003c")});</script>
  <p><a href="${esc(destino)}">Ver producto</a></p>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // Cache corto: si cambia el precio o la foto, se actualiza en minutos
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
  res.status(200).send(html);
}
