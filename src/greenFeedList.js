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

    insertarAlInicio(){
        //TODO:Implementar Métodos Nuevos
    }
    eliminarNodo(){
        //TODO:Implementar Métodos Nuevos
    }
    mostrarFeedCompleto(){
        //TODO:Implementar Métodos Nuevos
    }


}
