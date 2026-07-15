/**
 * greenFeedList.js para la implementación en el proyecto
 * Contiene las clases NodoVideo y GreenFeedList
 * @author GrupoB
 */


/**
 * @class NodoVideo
 * Representa un video dentro del feed, con referencias al video anterior y siguiente.
 */
class NodoVideo {
    constructor(titulo, url) {
        this.titulo = titulo;
        this.url = url;
        this.siguiente = null;
        this.anterior = null;
    }
}

/**
 * @class GreenFeedList
 * Representa la lista doblemente enlazada, que maneja la gestion de los videos:
 * Eliminación de un video, insertar un video, y desplazar el cursor.
 */
class GreenFeedList {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.cursor = null; // Apunta al video reproduciéndose actualmente
    }

    insertarAlFinal(titulo, url) {
        const nuevoVideo = new NodoVideo(titulo, url);


    if (!this.cabeza) {
            this.cabeza = this.cola = this.cursor = nuevoVideo;
        } else {
            this.cola.siguiente = nuevoVideo;
            nuevoVideo.anterior = this.cola;
            this.cola = nuevoVideo;
        }
    }

    siguiente() {
        if (this.cursor && this.cursor.siguiente) {
            this.cursor = this.cursor.siguiente;
            return this.cursor;
        }
        return null; // Fin del feed
    }

    anterior() {
        if (this.cursor && this.cursor.anterior) {
            this.cursor = this.cursor.anterior;
            return this.cursor;
        }
        return null; // Inicio del feed
    }

    /**
     * Inserta un nuevo video al inicio del feed.
     * Si la lista está vacía, el nuevo nodo se convierte en la cabeza,
     * la cola y el cursor actual. En caso contrario, actualiza las
     * referencias necesarias para mantener la lista doblemente enlazada.
     *
     * @param {string} titulo Título del video.
     * @param {string} url URL asociada al video.
     * @returns {void}
     */
    insertarAlInicio(titulo, url) {
        const nuevoVideo = new NodoVideo(titulo, url);
        if (!this.cabeza) {
            this.cabeza = this.cola = this.cursor = nuevoVideo;
        } else {
            const nodoAntesDelPrimero = this.cabeza;
            this.cabeza = nuevoVideo;
            nodoAntesDelPrimero.anterior = nuevoVideo;
            nuevoVideo.siguiente = nodoAntesDelPrimero;
            nuevoVideo.anterior = null;
        }
    }

    /**
     * Elimina un nodo de la lista, reconectando los punteros de sus vecinos
     * (anterior y siguiente) para mantener la integridad de la lista.
     * Si el nodo eliminado es el actual del cursor, mueve el cursor al
     * siguiente video, o al anterior si no hay siguiente.
     * @param {NodoVideo} nodo - El nodo a eliminar de la lista.
     * @returns {void} No retorna ningún valor.
     */
    eliminarNodo(nodo) {
        if (!nodo) return;
        if (nodo.anterior !== null) {
            nodo.anterior.siguiente = nodo.siguiente
        } else {
            this.cabeza = nodo.siguiente
        }
        if (nodo.siguiente !== null) {
            nodo.siguiente.anterior = nodo.anterior
        } else {
            this.cola = nodo.anterior
        }
        if (this.cursor === nodo) {
            if (nodo.siguiente !== null) {
                this.cursor = nodo.siguiente
            } else {
                this.cursor = nodo.anterior
            }
        }
    }

    /**
     * Muestra en consola el título de cada video del feed,
     * recorriendo la lista desde la cabeza hasta el final.
     * @returns {void}
     */
    mostrarFeedCompleto() {
        if (!this.cabeza) {
            console.log("Feed vacío");
            return;
        }
        let nodo = this.cabeza;
        while (nodo !== null) {
            console.log(`Video: ${nodo.titulo}`);
            nodo = nodo.siguiente;
        }
    }

    /**
     * Elimina el video que se encuentra actualmente en el cursor.
     * Actúa como método de conveniencia sobre eliminarNodo(), delegando
     * la reconexión de punteros y el desplazamiento del cursor.
     * Si la lista está vacía (cursor es null), no realiza ninguna acción.
     * @returns {void} No retorna ningún valor.
     */
    eliminarActual() {
    if (!this.cursor) return; // Lista vacía, nada que eliminar
    this.eliminarNodo(this.cursor);
}

}
