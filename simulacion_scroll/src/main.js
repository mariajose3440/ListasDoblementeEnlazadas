import { obtenerVideos } from "../api/catalogoApi.js";
import { GreenFeedList } from "./GreenFeedList.js";

const lista = new GreenFeedList();
const usuario = JSON.parse(localStorage.getItem("usuario"));

// Referencias al DOM
const form = document.getElementById("form-video");
const contenedorVideo = document.getElementById("contenedor-video");
const contadorVideos = document.getElementById("contador-videos");
const btnArriba = document.getElementById("btn-arriba");
const btnAbajo = document.getElementById("btn-abajo");
const btnEliminar = document.getElementById("btn-eliminar");
const panelToggle = document.getElementById("panel-toggle");
const panelContenido = document.getElementById("panel-contenido");

panelToggle.addEventListener("click", () => {
  const abierto = panelContenido.classList.toggle("abierto");
  panelToggle.setAttribute("aria-expanded", abierto);
});
let sonidoActivo = false;

function esVideo(url) {
  return /\.(mp4|webm|ogg)(?:[?#].*)?$/i.test(url);
}

function normalizarUrlCatalogo(url) {
  // Compatibilidad con los datos antiguos "videos/video1.mp4". Vite publica
  // el contenido de la carpeta videos directamente desde la raíz.
  if (url?.startsWith("videos/")) return `/${url.slice("videos/".length)}`;
  return url;
}

function mostrarMensaje(mensaje) {
  contenedorVideo.replaceChildren();
  const texto = document.createElement("p");
  texto.className = "vacio";
  texto.textContent = mensaje;
  contenedorVideo.append(texto);
}

// Dibuja en pantalla el nodo apuntado por el cursor de la lista.
function renderizar() {
  contadorVideos.textContent = lista.tamano;

  if (lista.estaVacia()) {
    mostrarMensaje("No hay videos que coincidan con tus preferencias.");
    return;
  }

  const nodo = lista.cursor;
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";

  const media = document.createElement(esVideo(nodo.url) ? "video" : "img");
  media.src = nodo.url;
  if (media instanceof HTMLVideoElement) {
    media.autoplay = true;
    media.loop = true;
    media.muted = !sonidoActivo;
    media.volume = 1;
    media.playsInline = true;
  } else {
    media.alt = nodo.titulo;
  }

  const info = document.createElement("div");
  info.className = "info";

  const autor = document.createElement("p");
  autor.className = "autor";
  autor.textContent = `@${nodo.autor}`;

  const titulo = document.createElement("p");
  titulo.className = "titulo";
  titulo.textContent = nodo.titulo;

  const descripcion = document.createElement("p");
  descripcion.className = "descripcion";
  descripcion.textContent = nodo.descripcion;

  const etiquetas = document.createElement("p");
  etiquetas.className = "preferencias-video";
  etiquetas.textContent = nodo.preferencias
    .map((preferencia) => `#${preferencia}`)
    .join(" ");

  const botonLike = document.createElement("button");
  botonLike.className = "btn-like";
  botonLike.textContent = `❤️ ${nodo.likes}`;
  botonLike.addEventListener("click", () => {
    lista.darLike();
    renderizar();
  });

  if (media instanceof HTMLVideoElement) {
    const alternarReproduccion = async () => {
      if (media.paused) {
        try {
          await media.play();
        } catch (error) {
          console.warn("El navegador bloqueó la reproducción con audio.", error);
        }
      } else {
        media.pause();
      }

      sonidoActivo = !media.paused;
      media.muted = !sonidoActivo;
    };

    media.addEventListener("click", alternarReproduccion);
  }
  tarjeta.append(media);

  info.append(autor, titulo, descripcion);
  if (nodo.preferencias.length) info.append(etiquetas);
  tarjeta.append(info, botonLike);
  contenedorVideo.replaceChildren(tarjeta);
}

async function cargarFeedPersonalizado() {
  mostrarMensaje("Cargando videos según tus preferencias…");

  try {
    const preferenciasUsuario = usuario?.preferencias ?? [];
    const respuesta = await obtenerVideos(preferenciasUsuario);
    const videos = Array.isArray(respuesta) ? respuesta : respuesta.results ?? [];

    videos.forEach((video) => {
      lista.insertarAlFinal(
        video.titulo,
        video.autor,
        normalizarUrlCatalogo(video.url_video),
        video.descripcion,
        video.likes,
        (video.preferencias ?? []).map((preferencia) => preferencia.nombre),
        video.id,
      );
    });

    renderizar();
  } catch (error) {
    console.error(error);
    mostrarMensaje(
      "No se pudo cargar el catálogo personalizado. Verifica que el servicio esté disponible.",
    );
  }
}

// Formulario: agrega un nodo local a la lista actual.
form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  lista.insertarAlFinal(
    document.getElementById("titulo").value,
    document.getElementById("autor").value,
    document.getElementById("url").value,
    document.getElementById("descripcion").value,
  );

  form.reset();
  renderizar();
});

btnAbajo.addEventListener("click", () => {
  lista.siguiente();
  renderizar();
});

btnArriba.addEventListener("click", () => {
  lista.anterior();
  renderizar();
});

btnEliminar.addEventListener("click", () => {
  lista.eliminarActual();
  renderizar();
});

let bloqueado = false;
document.getElementById("feed").addEventListener("wheel", (evento) => {
  if (bloqueado) return;
  bloqueado = true;

  if (evento.deltaY > 0) lista.siguiente();
  else lista.anterior();

  renderizar();
  setTimeout(() => (bloqueado = false), 300);
});

let touchStartY = 0;
document.getElementById("feed").addEventListener("touchstart", (evento) => {
  touchStartY = evento.touches[0].clientY;
});
document.getElementById("feed").addEventListener("touchend", (evento) => {
  const diferencia = touchStartY - evento.changedTouches[0].clientY;
  if (Math.abs(diferencia) < 40) return;

  if (diferencia > 0) lista.siguiente();
  else lista.anterior();
  renderizar();
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "ArrowDown") {
    lista.siguiente();
    renderizar();
  } else if (evento.key === "ArrowUp") {
    lista.anterior();
    renderizar();
  }
});

cargarFeedPersonalizado();
