# Listas Doblemente Enlazadas para Navegación de Feeds

**PROYECTO FINAL — ESTRUCTURA DE DATOS, UNIDAD 3**
*Navegación bidireccional de un feed multimedia mediante una lista doblemente enlazada con cursor*

## 📋 Descripción

Implementación de una lista doblemente enlazada con cursor (`GreenFeedList`) aplicada a la navegación de un feed multimedia de videos, inspirada en el comportamiento de plataformas como TikTok o Reels. Cada nodo del feed (`NodoVideo`) almacena el contenido del video —título, autor, URL, descripción, likes y preferencias— junto con dos punteros, `anterior` y `siguiente`, que permiten avanzar o retroceder desde la posición actual del cursor en tiempo O(1), sin recorrer la lista desde el inicio.

El proyecto está dividido en tres partes que se comunican entre sí, todas orquestadas con Docker Compose:

- **Servicio de usuarios** (`usuarios_ws` → contenedor `greenfeed-backend`, puerto 8003): maneja el login y las preferencias de cada usuario, sobre una base de datos MySQL (`greenfeed-db`).
- **Servicio de catálogo** (`catalogo_ws` → contenedor `catalogo_api`, puerto 8004): expone los videos y sus preferencias asociadas, sobre otra base de datos MySQL (`catalogo-db`), y permite filtrar el catálogo por las preferencias del usuario autenticado.
- **Frontend** (`simulacion_scroll` → contenedor `greenfeed-frontend`, puerto 5173): página de login y feed vertical construido con Vite. Consume ambos servicios por HTTP y arma la lista doblemente enlazada (`GreenFeedList`) en el cliente para navegar los videos ya filtrados.

Incluye además pruebas unitarias (Vitest) y un benchmark de rendimiento que compara la complejidad teórica de la lista contra su tiempo de ejecución real para distintos tamaños de feed.

Desarrollado como parte de la asignatura de Estructura de Datos — Universidad Nacional de Loja.

## 🎯 Objetivos

- Comparar el rendimiento de listas doblemente enlazadas frente a arreglos dinámicos en operaciones de navegación secuencial.
- Implementar las operaciones fundamentales de navegación bidireccional (inserción, eliminación, avance/retroceso de cursor) sobre la estructura del feed.
- Integrar la estructura de datos dentro de una arquitectura de microservicios (usuarios + catálogo), consumida desde un frontend real.
- Filtrar el feed dinámicamente según las preferencias que el usuario selecciona al iniciar sesión.
- Validar el comportamiento de la lista con pruebas unitarias y medir su rendimiento empírico.

## 🧩 Estructura del proyecto

- **`NodoVideo`**: nodo del feed, con `titulo`, `autor`, `url`, `descripcion`, `likes`, `preferencias`, `id`, y referencias `siguiente` / `anterior`.
- **`GreenFeedList`**: lista doblemente enlazada con cursor de reproducción, que implementa:
  - `insertarAlFinal(titulo, autor, url, descripcion, likes, preferencias, id)` — O(1)
  - `insertarAlInicio(titulo, autor, url, descripcion)` — O(1)
  - `siguiente()` / `anterior()` — mueven el cursor — O(1)
  - `eliminarNodo(nodo)` / `eliminarActual()` — reconectan los vecinos y reubican el cursor — O(1)
  - `darLike()` — suma un like al video en el cursor
  - `mostrarFeedCompleto()` — recorre e imprime todo el feed
  - `estaVacia()`, `tamano` — estado de la lista

### Servicios

| Servicio | Contenedor | Puerto | Base de datos |
|---|---|---|---|
| Frontend (Vite) | `greenfeed-frontend` | 5173 | — |
| Usuarios | `greenfeed-backend` | 8003 | `greenfeed-db` (MySQL) |
| Catálogo | `catalogo_api` | 8004 | `catalogo-db` (MySQL) |

## 🚀 Cómo correrlo

```bash
docker compose up
```

Espera a que ambas bases de datos MySQL terminen de inicializar (verás `ready for connections` en los logs de `greenfeed-db` y `catalogo-db`), y luego abre: http://localhost:5173

## 🧪 Cómo probarlo

1. Inicia sesión con un correo y contraseña registrados en la tabla `Usuario`.
2. El feed carga únicamente los videos cuyas preferencias coinciden con las del usuario autenticado.
3. Navega entre videos con las flechas en pantalla, la rueda del mouse, el swipe táctil o las flechas del teclado (↑ ↓); cada movimiento avanza o retrocede el cursor sobre la lista doblemente enlazada.
4. El botón ❤️ suma un like al video actual.
5. "Eliminar video actual" saca el nodo del feed y reacomoda los punteros y el cursor.
6. También puedes agregar un video nuevo manualmente desde el panel "Agregar Video" (título, autor, URL o ruta local del video/imagen, y descripción).

## 🧪 Tests y benchmark

Dentro de `simulacion_scroll/`:

```bash
npm test          # corre las pruebas unitarias con Vitest
npm run bench     # corre el benchmark de rendimiento (node benchmark/rendimiento.js)
```

## 👩‍💻 Autoras

Mishell Vanesa Castillo Flores.

Alisson Lisbeth Gaona Gaona.

María Teresa Rivas Apolo.

María José Rodríguez Saraguro.