# Listas Doblemente Enlazadas para Navegación de Feeds Multimedia Sostenibles

**COMPENDIO METODOLÓGICO: ESTRUCTURAS DE DATOS EFICIENTES EN JAVASCRIPT**
*Enfoque de Optimización, Latencia y Computación Ecológica (Green Computing)*

## 📋 Descripción

Implementación de una lista doblemente enlazada (`GreenFeedList`) aplicada a la navegación de feeds multimedia (video, música), inspirada en el comportamiento de plataformas como TikTok, Spotify y YouTube. El proyecto analiza cómo la elección de estructura de datos impacta directamente en la eficiencia de acceso, la localidad de referencia en memoria y, por extensión, el consumo energético del dispositivo del usuario.

Desarrollado como parte de la metodología ABI (Aprendizaje Basado en Investigación) para la asignatura de Estructura de Datos — Universidad Nacional de Loja.

## 🎯 Objetivos

- Comparar el rendimiento de listas doblemente enlazadas frente a arreglos dinámicos en operaciones de navegación secuencial.
- Analizar la relación entre localidad de datos (*data locality*), *cache misses* y consumo energético.
- Implementar operaciones fundamentales de navegación bidireccional (inserción, eliminación, avance/retroceso de cursor) sobre una estructura de feed.

## 🧩 Estructura del proyecto

- `NodoVideo`: nodo base con referencias `siguiente` y `anterior`.
- `GreenFeedList`: lista doblemente enlazada con cursor de reproducción, que implementa:
  - `insertarAlFinal(titulo, url)`
  - `insertarAlInicio(titulo, url)`
  - `eliminarNodo(nodo)`
  - `mostrarFeedCompleto()`
  - `siguiente()` / `anterior()`
