# Listas Doblemente Enlazadas para Navegación de Feeds Multimedia Sostenibles
 
**COMPENDIO METODOLÓGICO: ESTRUCTURAS DE DATOS EFICIENTES EN JAVASCRIPT**
*Enfoque de Optimización, Latencia y Computación Ecológica (Green Computing)*
 
## 📋 Descripción
 
Implementación de una lista doblemente enlazada (`GreenFeedList`) aplicada a la navegación de feeds multimedia (video, música), inspirada en el comportamiento de plataformas como TikTok, Spotify y YouTube. El proyecto analiza cómo la elección de estructura de datos impacta directamente en la eficiencia de acceso, la localidad de referencia en memoria y, por extensión, el consumo energético del dispositivo del usuario.
 
Además de la implementación base en JavaScript, el proyecto incluye una **simulación visual interactiva** tipo feed vertical (similar a TikTok/Reels), construida sobre la misma estructura de datos, para observar en tiempo real el comportamiento de inserción, eliminación y navegación bidireccional.
 
Desarrollado como parte de la metodología ABI (Aprendizaje Basado en Investigación) para la asignatura de Estructura de Datos — Universidad Nacional de Loja.
 
## 🎯 Objetivos
 
- Comparar el rendimiento de listas doblemente enlazadas frente a arreglos dinámicos en operaciones de navegación secuencial.
- Analizar la relación entre localidad de datos (*data locality*), *cache misses* y consumo energético.
- Implementar operaciones fundamentales de navegación bidireccional (inserción, eliminación, avance/retroceso de cursor) sobre una estructura de feed.
- Visualizar el comportamiento de la estructura mediante una interfaz interactiva.
## 🧩 Estructura del proyecto
 
- `NodoVideo`: nodo del feed, con `titulo`, `autor`, `url`, `descripcion`, `likes`, y referencias `siguiente` / `anterior`.
- `GreenFeedList`: lista doblemente enlazada con cursor de reproducción, que implementa:
  - `insertarAlFinal(titulo, autor, url, descripcion)`
  - `insertarAlInicio(titulo, autor, url, descripcion)`
  - `eliminarNodo(nodo)`
  - `eliminarActual()`
  - `mostrarFeedCompleto()`
  - `siguiente()` / `anterior()`
  - `estaVacia()`
  - `darLike()`
  - `tamano` — cantidad de videos en el feed
## 🚀 Cómo correrlo
 
```bash
npm install
npm run dev
```
 
Abre la URL que te muestre la terminal (normalmente `http://localhost:5173`).
 
## 🧪 Cómo probarlo
 
1. Llena el formulario con título, autor, URL (o ruta local) del video/imagen y una descripción.
2. Cada "Publicar" agrega un nuevo `NodoVideo` al final del feed.
3. Navega entre videos con las flechas en pantalla, la rueda del mouse, el swipe táctil, o las flechas del teclado (↑ ↓).
4. "Eliminar video actual" saca el nodo del feed y reacomoda los punteros y el cursor.
5. El botón de ❤️ suma un like al video que se está viendo.
**Sobre las URLs de video/imagen:** puedes usar enlaces públicos de prueba, o videos/imágenes guardados localmente dentro del proyecto (por ejemplo en una carpeta `videos/`), referenciándolos con una ruta relativa (`videos/mi-video.mp4`).
 
 
## 👩‍💻 Autoras

Mishell Vanesa Castillo Flores.

Alisson Lisbeth Gaona Gaona.

María Teresa Rivas Apolo.

María José Rodríguez Saraguro. 
