// Colores de un producto.
// En el campo "colores" del producto se escriben los nombres separados por coma:
//     Blanco, Negro, Verde agua:#7fd1b9
// - Si el nombre es común (blanco, negro, rojo...) el color se dibuja solo.
// - Si no, se agrega el código después de ":" (por ejemplo  Verde agua:#7fd1b9).
// - Si no hay código y el nombre no está en la lista, se muestra como botón de texto.

const MAPA = {
  blanco: "#ffffff",
  negro: "#1a1a1a",
  gris: "#9aa0a6",
  plateado: "#c0c0c0",
  dorado: "#d4af37",
  rojo: "#d62828",
  bordo: "#7b1e2b",
  rosa: "#f4a6c0",
  fucsia: "#d6336c",
  naranja: "#f97316",
  amarillo: "#facc15",
  verde: "#2f9e44",
  turquesa: "#14b8a6",
  celeste: "#7dd3fc",
  azul: "#1d4ed8",
  violeta: "#7c3aed",
  lila: "#c4b5fd",
  marron: "#7c4a2d",
  beige: "#e8d9b5",
  natural: "#d9c7a3",
  kraft: "#b88a5a",
  madera: "#a67c52",
};

const sinAcentos = (texto) =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

const hexValido = (texto = "") => {
  const limpio = String(texto).trim();
  return /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(limpio)
    ? (limpio.startsWith("#") ? limpio : `#${limpio}`)
    : null;
};

// Devuelve una lista [{ nombre, hex }]. "hex" es null si no se conoce el color.
export function parseColores(valor) {
  const lista = Array.isArray(valor)
    ? valor
    : typeof valor === "string"
      ? valor.split(",")
      : [];

  return lista
    .map((item) => {
      if (item && typeof item === "object") {
        const nombre = String(item.nombre ?? "").trim();
        return { nombre, hex: hexValido(item.hex) ?? MAPA[sinAcentos(nombre)] ?? null };
      }
      const [nombreCrudo, hexCrudo] = String(item).split(":");
      const nombre = nombreCrudo.trim();
      return { nombre, hex: hexValido(hexCrudo) ?? MAPA[sinAcentos(nombre)] ?? null };
    })
    .filter((color) => color.nombre);
}
