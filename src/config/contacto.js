import { descuentoDe, esOferta, precioFinal } from "../utils/precios";

// Datos de contacto de la tienda.
// WHATSAPP_NUMERO: código de país + código de área + número, solo dígitos,
// sin "+", espacios, guiones ni el "0" / "15".
// Ejemplo Argentina (celular de Buenos Aires): 54 9 11 2345 6789 -> "5491123456789"
export const WHATSAPP_NUMERO = "5491167049288";

// Dirección pública de la tienda (se usa para armar el link que se comparte)
export const SITIO_URL = "https://e-commerce-cero-huella.vercel.app";

// Mensaje que aparece escrito de antemano en el chat (botón flotante)
export const WHATSAPP_MENSAJE = "Hola! Quisiera hacer una consulta sobre sus productos.";

// Arma el link que abre el chat con un mensaje ya escrito
export const urlWhatsApp = (mensaje) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;

// Mensaje de consulta por un producto: nombre, precio e imagen
export const mensajeConsultaProducto = (producto) => {
  const lineas = [
    "Hola! Quisiera consultar por este producto:",
    `*${producto.name}*`,
  ];

  if (esOferta(producto)) {
    lineas.push(
      `Precio: $ ${precioFinal(producto)} (${descuentoDe(producto)}% de descuento, antes $ ${producto.price})`
    );
  } else {
    lineas.push(`Precio: $ ${producto.price}`);
  }

  // Link que WhatsApp convierte en tarjeta con nombre, precio y foto del producto
  lineas.push(`Ver producto: ${SITIO_URL}/compartir/${encodeURIComponent(producto.id)}`);

  return lineas.join("\n");
};
