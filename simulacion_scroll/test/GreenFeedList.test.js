import { describe, it, expect, beforeEach } from "vitest";
import { GreenFeedList } from "../src/GreenFeedList.js";

describe("GreenFeedList - insertarAlFinal", () => {
    let feed;

    beforeEach(() => {
        feed = new GreenFeedList();
    });

    it("inserta en lista vacía: cabeza, cola y cursor apuntan al mismo nodo", () => {
        feed.insertarAlFinal("Video 1", "Autor 1", "url1", "desc1");

        expect(feed.cabeza.titulo).toBe("Video 1");
        expect(feed.cola.titulo).toBe("Video 1");
        expect(feed.cursor.titulo).toBe("Video 1");
        expect(feed.tamano).toBe(1);
        expect(feed.cabeza.anterior).toBeNull();
        expect(feed.cabeza.siguiente).toBeNull();
    });

    it("inserta varios videos manteniendo el orden y los enlaces", () => {
        feed.insertarAlFinal("V1", "A1", "u1", "d1");
        feed.insertarAlFinal("V2", "A2", "u2", "d2");
        feed.insertarAlFinal("V3", "A3", "u3", "d3");

        expect(feed.tamano).toBe(3);
        expect(feed.cabeza.titulo).toBe("V1");
        expect(feed.cola.titulo).toBe("V3");
        // El cursor NO se mueve al insertar al final, sigue en la cabeza original
        expect(feed.cursor.titulo).toBe("V1");

        // Enlaces hacia adelante
        expect(feed.cabeza.siguiente.titulo).toBe("V2");
        expect(feed.cabeza.siguiente.siguiente.titulo).toBe("V3");

        // Enlaces hacia atrás
        expect(feed.cola.anterior.titulo).toBe("V2");
        expect(feed.cola.anterior.anterior.titulo).toBe("V1");
        expect(feed.cola.siguiente).toBeNull();
    });

    it("usa los valores por defecto de likes, preferencias e id cuando no se pasan", () => {
        feed.insertarAlFinal("V1", "A1", "u1", "d1");
        expect(feed.cabeza.likes).toBe(0);
        expect(feed.cabeza.preferencias).toEqual([]);
        expect(feed.cabeza.id).toBeNull();
    });
});

describe("GreenFeedList - insertarAlInicio", () => {
    let feed;

    beforeEach(() => {
        feed = new GreenFeedList();
    });

    it("inserta en lista vacía: cabeza, cola y cursor apuntan al mismo nodo", () => {
        feed.insertarAlInicio("V1", "A1", "u1", "d1");
        expect(feed.cabeza.titulo).toBe("V1");
        expect(feed.cola.titulo).toBe("V1");
        expect(feed.cursor.titulo).toBe("V1");
        expect(feed.tamano).toBe(1);
    });

    it("inserta varios videos al inicio, quedando en orden inverso", () => {
        feed.insertarAlInicio("V1", "A1", "u1", "d1");
        feed.insertarAlInicio("V2", "A2", "u2", "d2");
        feed.insertarAlInicio("V3", "A3", "u3", "d3");

        expect(feed.tamano).toBe(3);
        expect(feed.cabeza.titulo).toBe("V3");
        expect(feed.cola.titulo).toBe("V1");
        expect(feed.cabeza.anterior).toBeNull();
        expect(feed.cabeza.siguiente.titulo).toBe("V2");
        expect(feed.cabeza.siguiente.siguiente.titulo).toBe("V1");
        expect(feed.cola.siguiente).toBeNull();
    });
});

describe("GreenFeedList - navegación (siguiente / anterior)", () => {
    let feed;

    beforeEach(() => {
        feed = new GreenFeedList();
        feed.insertarAlFinal("V1", "A1", "u1", "d1");
        feed.insertarAlFinal("V2", "A2", "u2", "d2");
        feed.insertarAlFinal("V3", "A3", "u3", "d3");
    });

    it("siguiente() avanza el cursor y retorna el nuevo nodo", () => {
        const nodo = feed.siguiente();
        expect(nodo.titulo).toBe("V2");
        expect(feed.cursor.titulo).toBe("V2");
    });

    it("siguiente() retorna null al llegar al final y no mueve el cursor", () => {
        feed.siguiente(); // V2
        feed.siguiente(); // V3
        const resultado = feed.siguiente(); // ya no hay más
        expect(resultado).toBeNull();
        expect(feed.cursor.titulo).toBe("V3");
    });

    it("anterior() retrocede el cursor y retorna el nuevo nodo", () => {
        feed.siguiente(); // V2
        feed.siguiente(); // V3
        const nodo = feed.anterior();
        expect(nodo.titulo).toBe("V2");
        expect(feed.cursor.titulo).toBe("V2");
    });

    it("anterior() retorna null al llegar al inicio y no mueve el cursor", () => {
        const resultado = feed.anterior();
        expect(resultado).toBeNull();
        expect(feed.cursor.titulo).toBe("V1");
    });

    it("siguiente()/anterior() en lista vacía retornan null sin lanzar error", () => {
        const vacia = new GreenFeedList();
        expect(vacia.siguiente()).toBeNull();
        expect(vacia.anterior()).toBeNull();
    });
});

describe("GreenFeedList - eliminarNodo", () => {
    let feed;

    beforeEach(() => {
        feed = new GreenFeedList();
        feed.insertarAlFinal("V1", "A1", "u1", "d1");
        feed.insertarAlFinal("V2", "A2", "u2", "d2");
        feed.insertarAlFinal("V3", "A3", "u3", "d3");
    });

    it("elimina el nodo cabeza y actualiza cabeza + enlace anterior del siguiente", () => {
        const cabezaOriginal = feed.cabeza;
        feed.eliminarNodo(cabezaOriginal);

        expect(feed.cabeza.titulo).toBe("V2");
        expect(feed.cabeza.anterior).toBeNull();
        expect(feed.tamano).toBe(2);
    });

    it("elimina el nodo cola y actualiza cola + enlace siguiente del anterior", () => {
        const colaOriginal = feed.cola;
        feed.eliminarNodo(colaOriginal);

        expect(feed.cola.titulo).toBe("V2");
        expect(feed.cola.siguiente).toBeNull();
        expect(feed.tamano).toBe(2);
    });

    it("elimina un nodo intermedio y reconecta a sus vecinos", () => {
        const intermedio = feed.cabeza.siguiente; // V2
        feed.eliminarNodo(intermedio);

        expect(feed.cabeza.siguiente.titulo).toBe("V3");
        expect(feed.cola.anterior.titulo).toBe("V1");
        expect(feed.tamano).toBe(2);
    });

    it("elimina el único nodo de la lista y deja cabeza/cola/cursor en null", () => {
        const unica = new GreenFeedList();
        unica.insertarAlFinal("Solo", "A", "u", "d");
        unica.eliminarNodo(unica.cabeza);

        expect(unica.cabeza).toBeNull();
        expect(unica.cola).toBeNull();
        expect(unica.cursor).toBeNull();
        expect(unica.tamano).toBe(0);
    });

    it("si el nodo eliminado es el cursor, lo mueve al siguiente", () => {
        feed.cursor = feed.cabeza.siguiente; // cursor en V2
        feed.eliminarNodo(feed.cursor);
        expect(feed.cursor.titulo).toBe("V3");
    });

    it("si el nodo eliminado es el cursor y es el último, mueve el cursor al anterior", () => {
        feed.cursor = feed.cola; // cursor en V3
        feed.eliminarNodo(feed.cursor);
        expect(feed.cursor.titulo).toBe("V2");
    });

    it("no hace nada si se pasa un nodo null/undefined", () => {
        const tamanoPrevio = feed.tamano;
        feed.eliminarNodo(null);
        expect(feed.tamano).toBe(tamanoPrevio);
    });
});

describe("GreenFeedList - eliminarActual", () => {
    it("elimina el video en el que está el cursor actualmente", () => {
        const feed = new GreenFeedList();
        feed.insertarAlFinal("V1", "A1", "u1", "d1");
        feed.insertarAlFinal("V2", "A2", "u2", "d2");
        feed.siguiente(); // cursor -> V2

        feed.eliminarActual();

        expect(feed.tamano).toBe(1);
        expect(feed.cabeza.titulo).toBe("V1");
        expect(feed.cursor.titulo).toBe("V1");
    });

    it("no lanza error si la lista está vacía (cursor null)", () => {
        const feed = new GreenFeedList();
        expect(() => feed.eliminarActual()).not.toThrow();
        expect(feed.tamano).toBe(0);
    });
});

describe("GreenFeedList - darLike", () => {
    it("incrementa los likes del video actual del cursor", () => {
        const feed = new GreenFeedList();
        feed.insertarAlFinal("V1", "A1", "u1", "d1", 5);

        const nodo = feed.darLike();

        expect(nodo.likes).toBe(6);
        expect(feed.cabeza.likes).toBe(6);
    });

    it("retorna null y no lanza error si la lista está vacía", () => {
        const feed = new GreenFeedList();
        const resultado = feed.darLike();
        expect(resultado).toBeNull();
    });
});

describe("GreenFeedList - estaVacia", () => {
    it("retorna true para una lista recién creada", () => {
        const feed = new GreenFeedList();
        expect(feed.estaVacia()).toBe(true);
    });

    it("retorna false luego de insertar al menos un video", () => {
        const feed = new GreenFeedList();
        feed.insertarAlFinal("V1", "A1", "u1", "d1");
        expect(feed.estaVacia()).toBe(false);
    });

    it("vuelve a true luego de eliminar todos los videos", () => {
        const feed = new GreenFeedList();
        feed.insertarAlFinal("V1", "A1", "u1", "d1");
        feed.eliminarActual();
        expect(feed.estaVacia()).toBe(true);
    });
});

describe("GreenFeedList - mostrarFeedCompleto", () => {
    it("no lanza error con lista vacía", () => {
        const feed = new GreenFeedList();
        expect(() => feed.mostrarFeedCompleto()).not.toThrow();
    });

    it("no lanza error recorriendo una lista con elementos", () => {
        const feed = new GreenFeedList();
        feed.insertarAlFinal("V1", "A1", "u1", "d1");
        feed.insertarAlFinal("V2", "A2", "u2", "d2");
        expect(() => feed.mostrarFeedCompleto()).not.toThrow();
    });
});

describe("GreenFeedList - integridad tras operaciones combinadas", () => {
    it("mantiene consistencia de cabeza/cola/tamano tras una mezcla de inserciones y eliminaciones", () => {
        const feed = new GreenFeedList();
        feed.insertarAlInicio("V1", "A1", "u1", "d1");
        feed.insertarAlFinal("V2", "A2", "u2", "d2");
        feed.insertarAlInicio("V0", "A0", "u0", "d0");
        feed.insertarAlFinal("V3", "A3", "u3", "d3");
        // Orden esperado: V0, V1, V2, V3
        expect(feed.tamano).toBe(4);

        feed.eliminarNodo(feed.cabeza.siguiente); // elimina V1
        expect(feed.tamano).toBe(3);

        // Recorremos y verificamos orden final: V0, V2, V3
        const titulos = [];
        let nodo = feed.cabeza;
        while (nodo !== null) {
            titulos.push(nodo.titulo);
            nodo = nodo.siguiente;
        }
        expect(titulos).toEqual(["V0", "V2", "V3"]);

        // Recorrido inverso desde la cola debe coincidir
        const titulosInversos = [];
        nodo = feed.cola;
        while (nodo !== null) {
            titulosInversos.push(nodo.titulo);
            nodo = nodo.anterior;
        }
        expect(titulosInversos).toEqual(["V3", "V2", "V0"]);
    });
});
