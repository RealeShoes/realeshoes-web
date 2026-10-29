/*
  ====================================================================
  CATÁLOGO DE REALESHOES
  ====================================================================
  Acá cargás cada par. Solo se muestran en la web los que tienen al
  menos marca, modelo, precio o foto; las cards vacías quedan ocultas.

  Campos de cada par:
    codigo       Código único. Z = zapatillas, B = botines (Z01, B03…).
                 Viaja en el mensaje de WhatsApp para que sepas cuál es.
    seccion      "zapatillas" o "botines".
    marca        Ej: "Nike".
    modelo       Ej: "SB Dunk Low Pro".
    talle        Ej: "42".
    precioLista  Precio sin descuento, solo números. Ej: 249999
    descuento    Porcentaje de descuento, solo números. Ej: 35
                 (deja null o 0 si no tiene descuento)
    etiqueta     Texto rojo opcional arriba del modelo. Ej: "Flash days".
                 Si lo dejás vacío y hay descuento, dice "Oferta".
    foto         Ruta de la foto dentro de la carpeta img/productos.
                 Ej: "img/productos/Z01.jpg"
    vendido      true si ya se vendió (se muestra en gris, sin botón).

  El precio final se calcula solo: precioLista menos el descuento.
  ====================================================================
*/

window.PRODUCTOS = [
  // ---------- ZAPATILLAS ----------
  { codigo: "Z01", seccion: "zapatillas", marca: "Nike", modelo: "Dunk", talle: "43", precioLista: 94117, descuento: 15, etiqueta: "", foto: "img/productos/Z01.jpg", vendido: false },
  { codigo: "Z02", seccion: "zapatillas", marca: "Nike", modelo: "Air Max", talle: "42", precioLista: 94117, descuento: 15, etiqueta: "", foto: "img/productos/Z02.jpg", vendido: false },
  { codigo: "Z03", seccion: "zapatillas", marca: "Nike", modelo: "Air Force", talle: "45", precioLista: 94117, descuento: 15, etiqueta: "", foto: "img/productos/Z03.jpg", vendido: false },
  { codigo: "Z04", seccion: "zapatillas", marca: "Nike", modelo: "Jordan 1", talle: "44.5", precioLista: 94443, descuento: 10, etiqueta: "", foto: "img/productos/Z04.jpg", vendido: false },
  { codigo: "Z05", seccion: "zapatillas", marca: "Nike", modelo: "SkateBoarding", talle: "41", precioLista: 94117, descuento: 15, etiqueta: "", foto: "img/productos/Z05.jpg", vendido: false },
  { codigo: "Z06", seccion: "zapatillas", marca: "Nike", modelo: "Air Force", talle: "44", precioLista: 94117, descuento: 15, etiqueta: "", foto: "img/productos/Z06.jpg", vendido: false },
  { codigo: "Z07", seccion: "zapatillas", marca: "Nike", modelo: "SkateBoarding", talle: "39", precioLista: 94117, descuento: 15, etiqueta: "", foto: "img/productos/Z07.jpg", vendido: false },
  { codigo: "Z08", seccion: "zapatillas", marca: "Nike", modelo: "Dunk", talle: "42", precioLista: 94117, descuento: 15, etiqueta: "", foto: "img/productos/Z08.jpg", vendido: false },
  { codigo: "Z09", seccion: "zapatillas", marca: "New Balance", modelo: "Fresh Foam", talle: "40", precioLista: 66666, descuento: 10, etiqueta: "", foto: "img/productos/Z09.jpg", vendido: false },
  { codigo: "Z10", seccion: "zapatillas", marca: "Nike", modelo: "Air Max", talle: "41", precioLista: 94117, descuento: 15, etiqueta: "", foto: "img/productos/Z010.jpg", vendido: false },
  { codigo: "Z11", seccion: "zapatillas", marca: "Lacoste", modelo: "L003 Evo", talle: "42", precioLista: 77777, descuento: 10, etiqueta: "", foto: "img/productos/Z011.jpg", vendido: false },
  { codigo: "Z12", seccion: "zapatillas", marca: "Nike", modelo: "Pegasus Plus", talle: "40", precioLista: 77777, descuento: 10, etiqueta: "", foto: "img/productos/Z012.jpg", vendido: false },
  { codigo: "Z13", seccion: "zapatillas", marca: "Nike", modelo: "Jordan 1", talle: "45", precioLista: 94443, descuento: 10, etiqueta: "", foto: "img/productos/Z013.jpg", vendido: false },
  { codigo: "Z14", seccion: "zapatillas", marca: "Nike", modelo: "Air Force", talle: "42", precioLista: 94117, descuento: 15, etiqueta: "", foto: "img/productos/Z014.jpg", vendido: false },
  { codigo: "Z15", seccion: "zapatillas", marca: "Nike", modelo: "Air Force", talle: "44", precioLista: 94117, descuento: 15, etiqueta: "", foto: "img/productos/Z015.jpg", vendido: false },
  { codigo: "Z16", seccion: "zapatillas", marca: "Nike", modelo: "TN", talle: "41", precioLista: 94443, descuento: 10, etiqueta: "", foto: "img/productos/Z016.jpg", vendido: false },
  { codigo: "Z17", seccion: "zapatillas", marca: "Nike", modelo: "Air Force", talle: "39", precioLista: 94117, descuento: 15, etiqueta: "", foto: "img/productos/Z017.jpg", vendido: false },
  { codigo: "Z18", seccion: "zapatillas", marca: "Nike", modelo: "Run Vomero 18", talle: "42", precioLista: 77777, descuento: 10, etiqueta: "", foto: "img/productos/Z018.jpg", vendido: false },
  { codigo: "Z19", seccion: "zapatillas", marca: "Nike", modelo: "Air Jordan", talle: "42", precioLista: 100000, descuento: null, etiqueta: "", foto: "img/productos/Z019.jpg", vendido: true },
  { codigo: "Z20", seccion: "zapatillas", marca: "", modelo: "", talle: "", precioLista: null, descuento: null, etiqueta: "", foto: "", vendido: false },
  { codigo: "Z21", seccion: "zapatillas", marca: "", modelo: "", talle: "", precioLista: null, descuento: null, etiqueta: "", foto: "", vendido: false },
  { codigo: "Z22", seccion: "zapatillas", marca: "", modelo: "", talle: "", precioLista: null, descuento: null, etiqueta: "", foto: "", vendido: false },
  { codigo: "Z23", seccion: "zapatillas", marca: "", modelo: "", talle: "", precioLista: null, descuento: null, etiqueta: "", foto: "", vendido: false },
  { codigo: "Z24", seccion: "zapatillas", marca: "", modelo: "", talle: "", precioLista: null, descuento: null, etiqueta: "", foto: "", vendido: false },
  { codigo: "Z25", seccion: "zapatillas", marca: "", modelo: "", talle: "", precioLista: null, descuento: null, etiqueta: "", foto: "", vendido: false },
  { codigo: "Z26", seccion: "zapatillas", marca: "", modelo: "", talle: "", precioLista: null, descuento: null, etiqueta: "", foto: "", vendido: false },
  { codigo: "Z27", seccion: "zapatillas", marca: "", modelo: "", talle: "", precioLista: null, descuento: null, etiqueta: "", foto: "", vendido: false },
  { codigo: "Z28", seccion: "zapatillas", marca: "", modelo: "", talle: "", precioLista: null, descuento: null, etiqueta: "", foto: "", vendido: false },
  { codigo: "Z29", seccion: "zapatillas", marca: "", modelo: "", talle: "", precioLista: null, descuento: null, etiqueta: "", foto: "", vendido: false },
  { codigo: "Z30", seccion: "zapatillas", marca: "", modelo: "", talle: "", precioLista: null, descuento: null, etiqueta: "", foto: "", vendido: false },

  // ---------- BOTINES ----------
  { codigo: "B01", seccion: "botines", marca: "Nike", modelo: "Mercurial", talle: "42", precioLista: 87499, descuento: 20, etiqueta: "", foto: "img/productos/B01.jpg", vendido: false },
  { codigo: "B02", seccion: "botines", marca: "Nike", modelo: "Mercurial", talle: "45", precioLista: 87499, descuento: 20, etiqueta: "", foto: "img/productos/B02.jpg", vendido: false },
  { codigo: "B03", seccion: "botines", marca: "Nike", modelo: "Air Zoom", talle: "42", precioLista: 87499, descuento: 20, etiqueta: "", foto: "img/productos/B03.jpg", vendido: false },
  { codigo: "B04", seccion: "botines", marca: "", modelo: "", talle: "", precioLista: null, descuento: null, etiqueta: "", foto: "", vendido: false },
  { codigo: "B05", seccion: "botines", marca: "", modelo: "", talle: "", precioLista: null, descuento: null, etiqueta: "", foto: "", vendido: false },
  { codigo: "B06", seccion: "botines", marca: "", modelo: "", talle: "", precioLista: null, descuento: null, etiqueta: "", foto: "", vendido: false }

  /* Ejemplo de un par cargado (copialo arriba y cambiá los datos):
  { codigo: "Z01", seccion: "zapatillas", marca: "Nike", modelo: "SB Dunk Low Pro", talle: "42", precioLista: 249999, descuento: 35, etiqueta: "Flash days", foto: "img/productos/Z01.jpg", vendido: false },
  */
];
