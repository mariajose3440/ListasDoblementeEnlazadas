class NodoVideo {
    constructor(titulo, url) {
        this.titulo = titulo;
        this.url = url;
        this.siguiente = null;
        this.anterior = null;
    }
}

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

    eliminarNodo(nodo) {
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

    mostrarFeedCompleto() {
        let nodo = this.cabeza
        while (nodo !== null) {
            console.log(`Video: ${nodo.titulo}`)
            nodo = nodo.siguiente
        }
    }

}
