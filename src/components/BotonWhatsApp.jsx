import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_NUMERO, WHATSAPP_MENSAJE } from "../config/contacto";
import "../styles/BotonWhatsApp.css";

// Botón flotante que abre un chat de WhatsApp con la tienda.
// Se puede pasar un mensaje propio: <BotonWhatsApp mensaje="Hola, consulta por ..." />
function BotonWhatsApp({ mensaje = WHATSAPP_MENSAJE }) {
  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      className="boton-whatsapp"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      title="Escribinos por WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}

export default BotonWhatsApp;
