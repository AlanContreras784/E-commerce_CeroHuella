// ============================================================================
//  DATOS DE LA PÁGINA "TALLERES"
//  Para cambiar algo de la página, editá solo este archivo.
// ============================================================================

// Contacto de los talleres.
// whatsapp: código de país + código de área + número, solo dígitos (sin +, espacios ni guiones).
// Ejemplo: 011 3879-7700 -> "5491138797700"  (confirmá que sea el número correcto)
export const CONTACTO_TALLERES = {
  whatsapp: "5491138797700",
  lugar: "Laboratorio I+D+i · Coronel Pagola 3880, CABA",
  instagram: "https://www.instagram.com/ambiente.enaccion/",
};

// Foto grande de la parte de arriba (opcional). Pegá un "Enlace directo" de Postimages.
// Si queda vacío, se muestra solo el fondo verde.
export const IMAGEN_PORTADA = "https://i.postimg.cc/fRDDqHnT/equipo2.webp";

// Categorías para los filtros. El "id" tiene que coincidir con el de cada taller.
export const CATEGORIAS_TALLERES = [
  { id: "todos", nombre: "Todos" },
  { id: "oficios", nombre: "Oficios" },
  { id: "sustentables", nombre: "Sustentables" },
  { id: "peques", nombre: "Para peques" },
  { id: "solidarios", nombre: "Solidarios" },
];

// ----------------------------------------------------------------------------
//  TALLERES
//  imagen: pegá el "Enlace directo" de Postimages (termina en .jpg, .png, etc.).
//          Si queda vacía, la tarjeta muestra un ícono en su lugar.
//  etiquetas: datos cortos que aparecen como insignias (duración, nivel, modalidad).
//  No se escriben fechas acá para que la página no quede desactualizada:
//  cada botón lleva a WhatsApp para consultar las próximas fechas.
// ----------------------------------------------------------------------------
export const TALLERES = [
  {
    id: "electricidad",
    categoria: "oficios",
    titulo: "Electricidad",
    descripcion:
      "Instalaciones y mantenimiento eléctrico por niveles. El nivel 2 incluye tableros avanzados, automatizaciones, seguridad eléctrica y control de motores.",
    etiquetas: ["Presencial", "Por niveles"],
    imagen: "",
  },
  {
    id: "roturas-hogar",
    categoria: "oficios",
    titulo: "¿Roturas en el hogar? ¡Repáralas vos!",
    descripcion: "Aprendé a detectar y reparar las roturas más comunes de la casa.",
    etiquetas: ["2 clases de 3 horas"],
    imagen: "",
  },
  {
    id: "carpinteria",
    categoria: "oficios",
    titulo: "Carpintería",
    descripcion: "Trabajo con MDF y melamina, desde cero.",
    etiquetas: ["Nivel inicial"],
    imagen: "",
  },
  {
    id: "construccion-en-seco",
    categoria: "oficios",
    titulo: "Construcción en seco",
    descripcion:
      "Técnicas del oficio para cielorrasos, tabiques y revestimiento de paredes.",
    etiquetas: ["6 clases", "Nivel 1"],
    imagen: "",
  },
  {
    id: "herreria",
    categoria: "oficios",
    titulo: "Herrería: introducción a la soldadura",
    descripcion: "Primeros pasos en soldadura y trabajo del metal.",
    etiquetas: ["Presencial", "6 clases"],
    imagen: "",
  },
  {
    id: "estufas-cocinas",
    categoria: "sustentables",
    titulo: "Estufas y cocinas económicas",
    descripcion: "Aprendé a hacerlas y a usarlas.",
    etiquetas: ["Taller sustentable"],
    imagen: "",
  },
  {
    id: "compostera",
    categoria: "sustentables",
    titulo: "Compostera de bajo costo",
    descripcion:
      "Armá tu propia compostera y convertí tus residuos orgánicos en abono.",
    etiquetas: ["Taller sustentable"],
    imagen: "",
  },
  {
    id: "huerta-urbana",
    categoria: "sustentables",
    titulo: "Huerta urbana",
    descripcion:
      "Reconocé, prepará y sembrá semillas de temporada. Almácigos, siembra y cuidados para producir tus propios alimentos en casa.",
    etiquetas: ["Taller sustentable"],
    imagen: "",
  },
  {
    id: "separacion-residuos",
    categoria: "sustentables",
    titulo: "Separación de materiales reciclables y reutilizables",
    descripcion:
      "Taller práctico para aprender a separar correctamente los materiales.",
    etiquetas: ["Práctico"],
    imagen: "",
  },
  {
    id: "arte-tecnologia",
    categoria: "peques",
    titulo: "Arte y tecnología para peques",
    descripcion: "Un taller para que los chicos creen y experimenten con arte y tecnología.",
    etiquetas: ["Niñas y niños"],
    imagen: "",
  },
  {
    id: "robotica",
    categoria: "peques",
    titulo: "Introducción a la robótica",
    descripcion: "Primeros pasos en robótica, en dos encuentros.",
    etiquetas: ["2 encuentros"],
    imagen: "",
  },
  {
    id: "bolsas-de-dormir",
    categoria: "solidarios",
    titulo: "Bolsas de dormir solidarias",
    descripcion:
      "Jornadas para armar bolsas de dormir que dan abrigo a personas en situación de calle.",
    etiquetas: ["Jornadas solidarias"],
    imagen: "",
  },
];

// ----------------------------------------------------------------------------
//  COMENTARIOS DE QUIENES TOMARON LOS TALLERES
//  Agregá un bloque por persona (sin borrar las comas). Ejemplo:
//
//  {
//    nombre: "Nombre y apellido (o solo el nombre)",
//    taller: "Compostera de bajo costo",
//    texto: "Lo que la persona escribió, tal cual lo dijo.",
//  },
//
//  Pedí permiso a cada persona antes de publicar su nombre y su comentario.
//  Mientras la lista esté vacía, la página muestra un mensaje invitando a dejar un comentario.
// ----------------------------------------------------------------------------
export const COMENTARIOS = [
  // { nombre: "", taller: "", texto: "" },
];
