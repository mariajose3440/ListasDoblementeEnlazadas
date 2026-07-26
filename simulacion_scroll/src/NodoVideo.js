/**
 * @class NodoVideo
 * Representa un video dentro del feed, con referencias al video anterior y siguiente.
 * @author GrupoB
 */

export class NodoVideo {
    constructor(
        titulo,
        autor,
        url,
        descripcion = '',
        likes = 0,
        preferencias = [],
        id = null,
    ) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.url = url;
        this.descripcion = descripcion;
        this.preferencias = preferencias;
        this.siguiente = null;
        this.anterior = null;
        this.likes = likes;
    }
}
