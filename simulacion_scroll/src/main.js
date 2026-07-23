import { GreenFeedList } from "./GreenFeedList";

const lista = new GreenFeedList();

// Referencias al DOM
const form = document.getElementById("form-video");
const contenedorVideo = document.getElementById("contenedor-video");
const contadorVideos = document.getElementById("contador-videos");
const btnArriba = document.getElementById("btn-arriba");
const btnAbajo = document.getElementById("btn-abajo");
const btnEliminar = document.getElementById("btn-eliminar");
 
// Detecta si la url es un video (.mp4/.webm) o una imagen
function esVideo(url) {
  return /\.(mp4|webm|ogg)$/i.test(url);
}
 
// Dibuja en pantalla el nodo "cursor" de la lista
function renderizar() {
  contadorVideos.textContent = lista.tamano;
 
  if (lista.estaVacia()) {
    contenedorVideo.innerHTML = `<p class="vacio">Todavía no hay videos. ¡Agrega el primero! 👆</p>`;
    return;
  }
 
  const nodo = lista.cursor; // CAMBIO: antes era lista.actual
  const mediaHtml = esVideo(nodo.url)
    ? `<video src="${nodo.url}" autoplay loop muted playsinline></video>`
    : `<img src="${nodo.url}" alt="${nodo.titulo}" />`;
 
  contenedorVideo.innerHTML = `
    <div class="tarjeta">
      ${mediaHtml}
      <div class="info">
        <p class="autor">@${nodo.autor}</p>
        <p class="titulo">${nodo.titulo}</p>
        <p class="descripcion">${nodo.descripcion}</p>
      </div>
      <button class="btn-like" id="btn-like">❤️ ${nodo.likes}</button>
    </div>
  `;
 
  document.getElementById("btn-like").addEventListener("click", () => {
    lista.darLike();
    renderizar();
  });
}
 
// --- Formulario: agregar nuevo nodo a la lista ---
form.addEventListener("submit", (e) => {
  e.preventDefault();
 
  // CAMBIO: insertarAlFinal recibe 4 parámetros sueltos, no un objeto como agregarVideo
  lista.insertarAlFinal(
    document.getElementById("titulo").value,
    document.getElementById("autor").value,
    document.getElementById("url").value,
    document.getElementById("descripcion").value
  );
 
  form.reset();
  renderizar();
});
 
// --- Navegación tipo scroll ---
btnAbajo.addEventListener("click", () => {
  lista.siguiente(); // CAMBIO: antes era lista.siguienteVideo()
  renderizar();
});
 
btnArriba.addEventListener("click", () => {
  lista.anterior(); // CAMBIO: antes era lista.anteriorVideo()
  renderizar();
});
 
btnEliminar.addEventListener("click", () => {
  lista.eliminarActual();
  renderizar();
});
 
// Scroll con la rueda del mouse (como en TikTok en desktop)
let bloqueado = false;
document.getElementById("feed").addEventListener("wheel", (e) => {
  if (bloqueado) return;
  bloqueado = true;
 
  if (e.deltaY > 0) lista.siguiente(); // CAMBIO
  else lista.anterior(); // CAMBIO
 
  renderizar();
  setTimeout(() => (bloqueado = false), 300); // evita que un solo gesto avance varios videos
});
 
// Swipe táctil (celular)
let touchStartY = 0;
document.getElementById("feed").addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
});
document.getElementById("feed").addEventListener("touchend", (e) => {
  const touchEndY = e.changedTouches[0].clientY;
  const diferencia = touchStartY - touchEndY;
 
  if (Math.abs(diferencia) < 40) return; // swipe muy corto, se ignora
 
  if (diferencia > 0) lista.siguiente(); // CAMBIO
  else lista.anterior(); // CAMBIO
 
  renderizar();
});
 
// Flechas del teclado (útil para probar rápido)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    lista.siguiente(); // CAMBIO
    renderizar();
  } else if (e.key === "ArrowUp") {
    lista.anterior(); // CAMBIO
    renderizar();
  }
});
 
renderizar();