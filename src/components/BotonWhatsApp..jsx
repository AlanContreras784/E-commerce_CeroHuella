import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_MENSAJE, urlWhatsApp } from "../config/contacto";
import "../styles/BotonWhatsApp.css";

// Botón flotante que abre un chat de WhatsApp con la tienda.
// Se puede pasar un mensaje propio: <BotonWhatsApp mensaje="Hola, consulta por ..." />
function BotonWhatsApp({ mensaje = WHATSAPP_MENSAJE }) {
  return (
    <a
      className="boton-whatsapp"
      href={urlWhatsApp(mensaje)}
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
