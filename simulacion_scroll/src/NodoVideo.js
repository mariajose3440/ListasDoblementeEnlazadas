/**
 * @class NodoVideo
 * Representa un video dentro del feed, con referencias al video anterior y siguiente.
 * @author GrupoB
 */

export class NodoVideo {
    constructor(titulo,autor, url, descripcion ='' ) {
        this.titulo = titulo;
        this.autor = autor;
        this.url = url;
        this.descripcion = descripcion;
        this.siguiente = null;
        this.anterior = null;
        this.likes = 0;
    }
}