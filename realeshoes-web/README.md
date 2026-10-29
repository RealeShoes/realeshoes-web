# Realeshoes — sitio web

Tienda de zapatillas y botines de Realeshoes (Los Polvorines). Sitio estático en HTML, CSS y JavaScript: no necesita servidor ni base de datos y se puede publicar gratis con GitHub Pages.

## Estructura

```
index.html              Página principal (header, carrusel, envíos, footer)
css/styles.css          Estilos (mobile-first)
js/productos.js         CATÁLOGO: acá cargás los pares
js/app.js               Lógica: cards, filtros de marca y talle, buscador, carrusel, WhatsApp
img/logo.webp|png       Logo
img/favicon.png         Ícono de la pestaña
img/productos/          Fotos de los productos
```

## Cargar o editar un par

1. Subí la foto a `img/productos/` con el código del par como nombre, por ejemplo `Z01.jpg`. Lo ideal es una foto cuadrada de 1000 × 1000 px, en JPG o WEBP y con menos de 300 KB.
2. Abrí `js/productos.js` y completá la línea de ese código:

```js
{ codigo: "Z01", seccion: "zapatillas", marca: "Nike", modelo: "SB Dunk Low Pro", talle: "42", precioLista: 249999, descuento: 35, etiqueta: "Flash days", foto: "img/productos/Z01.jpg", vendido: false },
```

- El **precio final** se calcula solo: 249.999 con 35% de descuento se muestra como $ 162.499.
- Si el par no tiene descuento, poné `descuento: 0`.
- Para mandarlo a la sección **Botines**, poné `seccion: "botines"` y usá un código que empiece con B.
- Cuando se venda, cambiá `vendido: true`. El par queda en gris y sin botón de consulta.
- **Talle**: puede ser uno (`"42"`), varios (`"40, 41"`) o un rango (`"40 al 43"`). El filtro de talle los reconoce.
- Las líneas vacías no se muestran. Para agregar más pares, copiá una línea y cambiale el código (Z31, Z32…).

## Editar desde Visual Studio Code

1. **Abrir el proyecto:** *Archivo → Abrir carpeta* y elegí la carpeta del repo (la que tiene `index.html`).
2. **Ver la página en vivo:** instalá la extensión **Live Server** (de Ritwick Dey). Después hacé clic derecho en `index.html` → *Open with Live Server*. Cada vez que guardes, el navegador se actualiza solo.
3. **Cambiar una foto:** arrastrá la imagen nueva a `img/productos/` y nombrala con el código del par (`Z01.jpg`). Si ya había una con ese nombre, reemplazala. Si la nombrás distinto, actualizá el campo `foto` en `js/productos.js`.
4. **Cambiar precio, descuento o talle:** abrí `js/productos.js`, usá `Ctrl+F` para buscar el código (por ejemplo `Z07`) y editá `precioLista`, `descuento` o `talle`. Guardá con `Ctrl+S`.
5. **Publicar:** en el panel *Source Control* (`Ctrl+Shift+G`) escribí un mensaje (por ejemplo "Precio Z07"), tocá **Commit** y después **Sync Changes / Push**. En unos minutos se ve en GitHub Pages.

Consejos:
- Los números van **sin puntos ni signo $**: `249999`, no `249.999`.
- Los textos van entre comillas y cada línea termina en coma. Si la página queda en blanco, revisá que no falte una coma o una comilla (VS Code lo marca en rojo).
- Si el navegador muestra la foto vieja, recargá con `Ctrl+F5`.

## Publicar en GitHub Pages

1. Creá un repositorio nuevo en GitHub, por ejemplo `realeshoes`.
2. Subí **el contenido** de esta carpeta, con `index.html` en la raíz del repo. Podés usar **Add file → Upload files** y arrastrar todo.
3. En el repo andá a **Settings → Pages**.
4. En **Source** elegí **Deploy from a branch**, rama `main` y carpeta `/ (root)`. Guardá.
5. En uno o dos minutos el sitio queda en `https://TU-USUARIO.github.io/realeshoes/`.

Cada cambio que subas a `main` (fotos o `productos.js`) se publica solo en un par de minutos.

## Cambiar datos de contacto

- **WhatsApp**: en `js/app.js`, variable `WA` (solo números, con 549).
- **Textos del carrusel y de envíos**: en `index.html`.
- En el footer y en el header también aparecen el número y el usuario de Instagram (`index.html`).
