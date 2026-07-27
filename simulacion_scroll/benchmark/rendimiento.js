/**
 * rendimiento.js
 * Pruebas de rendimiento para GreenFeedList (lista doblemente enlazada).
 * Mide el tiempo de ejecución de cada operación para distintos tamaños (N)
 * y lo compara contra la complejidad teórica esperada.
 *
 * Ejecución: node benchmark/rendimiento.js
 */

import { GreenFeedList } from "../src/GreenFeedList.js";

const TAMANOS = [100, 1_000, 10_000, 50_000, 100_000];
const REPETICIONES = 5; // repeticiones por medición para reducir ruido

/**
 * Ejecuta fn REPETICIONES veces y retorna el tiempo (mediana) en milisegundos.
 */
function medir(fn) {
    const tiempos = [];
    for (let i = 0; i < REPETICIONES; i++) {
        const inicio = performance.now();
        fn();
        const fin = performance.now();
        tiempos.push(fin - inicio);
    }
    tiempos.sort((a, b) => a - b);
    // usamos la mediana para evitar outliers por GC/JIT
    return tiempos[Math.floor(tiempos.length / 2)];
}

/**
 * Igual que medir(), pero separa una fase "setup" (NO cronometrada) de una
 * fase "accion" (SÍ cronometrada). setup() se ejecuta antes de cada
 * repetición y su resultado se pasa a accion().
 */
function medirConSetup(setup, accion) {
    const tiempos = [];
    for (let i = 0; i < REPETICIONES; i++) {
        const contexto = setup();
        const inicio = performance.now();
        accion(contexto);
        const fin = performance.now();
        tiempos.push(fin - inicio);
    }
    tiempos.sort((a, b) => a - b);
    return tiempos[Math.floor(tiempos.length / 2)];
}

function construirFeed(n) {
    const feed = new GreenFeedList();
    for (let i = 0; i < n; i++) {
        feed.insertarAlFinal(`Video ${i}`, "Autor", `url${i}`, "desc");
    }
    return feed;
}

function formatear(ms) {
    if (ms < 1) return `${(ms * 1000).toFixed(2)} µs`;
    return `${ms.toFixed(3)} ms`;
}

function imprimirTabla(titulo, filas) {
    console.log(`\n=== ${titulo} ===`);
    const anchoN = 10;
    const anchoT = 15;
    console.log("N".padEnd(anchoN) + "Tiempo".padEnd(anchoT));
    console.log("-".repeat(anchoN + anchoT));
    for (const [n, t] of filas) {
        console.log(String(n).padEnd(anchoN) + formatear(t).padEnd(anchoT));
    }
}

console.log("Pruebas de rendimiento - GreenFeedList (lista doblemente enlazada)");
console.log(`Repeticiones por medición: ${REPETICIONES} (se reporta la mediana)\n`);

// ---------------------------------------------------------------------
// 1. insertarAlFinal (O(1) por inserción gracias al puntero "cola")
// ---------------------------------------------------------------------
const resultadosInsertarFinal = [];
for (const n of TAMANOS) {
    const t = medir(() => {
        const feed = new GreenFeedList();
        for (let i = 0; i < n; i++) {
            feed.insertarAlFinal(`Video ${i}`, "Autor", `url${i}`, "desc");
        }
    });
    resultadosInsertarFinal.push([n, t]);
}
imprimirTabla("insertarAlFinal (N inserciones) - esperado O(n) total, O(1) amortizado c/u", resultadosInsertarFinal);

// ---------------------------------------------------------------------
// 2. insertarAlInicio (O(1) por inserción gracias al puntero "cabeza")
// ---------------------------------------------------------------------
const resultadosInsertarInicio = [];
for (const n of TAMANOS) {
    const t = medir(() => {
        const feed = new GreenFeedList();
        for (let i = 0; i < n; i++) {
            feed.insertarAlInicio(`Video ${i}`, "Autor", `url${i}`, "desc");
        }
    });
    resultadosInsertarInicio.push([n, t]);
}
imprimirTabla("insertarAlInicio (N inserciones) - esperado O(n) total, O(1) amortizado c/u", resultadosInsertarInicio);

// ---------------------------------------------------------------------
// 3. Recorrido completo (siguiente() desde la cabeza hasta el final) - O(n)
// ---------------------------------------------------------------------
const resultadosRecorrido = [];
for (const n of TAMANOS) {
    const feed = construirFeed(n);
    const t = medir(() => {
        feed.cursor = feed.cabeza;
        let contador = 0;
        while (feed.cursor !== null) {
            contador++;
            if (feed.cursor.siguiente === null) break;
            feed.siguiente();
        }
    });
    resultadosRecorrido.push([n, t]);
}
imprimirTabla("Recorrido completo con siguiente() - esperado O(n)", resultadosRecorrido);

// ---------------------------------------------------------------------
// 4. darLike (O(1), solo toca el nodo del cursor)
// ---------------------------------------------------------------------
const resultadosDarLike = [];
for (const n of TAMANOS) {
    const feed = construirFeed(n);
    const t = medir(() => {
        feed.darLike();
    });
    resultadosDarLike.push([n, t]);
}
imprimirTabla("darLike() - esperado O(1), independiente de N", resultadosDarLike);

// ---------------------------------------------------------------------
// 5. eliminarNodo en la cabeza - O(1)
// ---------------------------------------------------------------------
const resultadosEliminarCabeza = [];
for (const n of TAMANOS) {
    const t = medirConSetup(
        () => construirFeed(n),
        (feed) => feed.eliminarNodo(feed.cabeza),
    );
    resultadosEliminarCabeza.push([n, t]);
}
imprimirTabla("eliminarNodo (nodo cabeza) - esperado O(1)", resultadosEliminarCabeza);

// ---------------------------------------------------------------------
// 6. eliminarNodo en la cola - O(1)
// ---------------------------------------------------------------------
const resultadosEliminarCola = [];
for (const n of TAMANOS) {
    const t = medirConSetup(
        () => construirFeed(n),
        (feed) => feed.eliminarNodo(feed.cola),
    );
    resultadosEliminarCola.push([n, t]);
}
imprimirTabla("eliminarNodo (nodo cola) - esperado O(1)", resultadosEliminarCola);

// ---------------------------------------------------------------------
// 7. eliminarNodo en el medio (incluye el costo de localizar el nodo, O(n))
// ---------------------------------------------------------------------
const resultadosEliminarMedio = [];
for (const n of TAMANOS) {
    const t = medirConSetup(
        () => construirFeed(n),
        (feed) => {
            // localizar el nodo intermedio: costo O(n)
            let nodo = feed.cabeza;
            for (let i = 0; i < Math.floor(n / 2); i++) {
                nodo = nodo.siguiente;
            }
            feed.eliminarNodo(nodo);
        },
    );
    resultadosEliminarMedio.push([n, t]);
}
imprimirTabla("Localizar nodo intermedio + eliminarNodo - esperado O(n) (dominado por la búsqueda)", resultadosEliminarMedio);

console.log("\nResumen:");
console.log("- insertarAlFinal / insertarAlInicio / darLike / eliminarNodo(cabeza|cola): O(1) por operación.");
console.log("- Recorrido completo y eliminación de un nodo intermedio (localizándolo primero): O(n).");
console.log("- Si el tiempo por operación se mantiene ~constante al crecer N, confirma O(1).");
console.log("- Si el tiempo crece linealmente con N, confirma O(n).\n");
