// URL base del web service (WS) de usuarios.
// Apunta al backend corriendo localmente en el puerto 8003, bajo la ruta /ws.
const BASE_URL = 'http://localhost:8003/ws';

/**
 * Obtiene la lista completa de usuarios registrados.
 * Hace un GET a /usuarios/ sin ningún filtro.
 * @returns {Promise<Array>} Arreglo con todos los usuarios (JSON ya parseado).
 * @throws {Error} Si la respuesta HTTP no es exitosa (status fuera del rango 200-299).
 */
export async function obtenerTodosUsuarios() {
    const response = await fetch(`${BASE_URL}/usuarios/`);

    // fetch no lanza error automáticamente en respuestas 4xx/5xx,
    // así que hay que revisar response.ok manualmente.
    if (!response.ok) throw new Error('Error al obtener usuarios');

    // Convierte el body de la respuesta (JSON) a un objeto/arreglo de JS.
    return await response.json();
}

/**
 * Busca un usuario específico por su correo electrónico exacto.
 * Hace un GET a /usuarios/email/{email}/.
 * @param {string} email - Correo del usuario a buscar.
 * @returns {Promise<Object>} Objeto con los datos del usuario encontrado.
 * @throws {Error} Si el usuario no existe o la petición falla.
 */
export async function obtenerUsuarioPorEmail(email) {
    const response = await fetch(`${BASE_URL}/usuarios/email/${email}/`);

    if (!response.ok) throw new Error('Usuario no encontrado');

    return await response.json();
}

/**
 * Busca usuarios cuyo nombre coincida (total o parcialmente) con el término dado.
 * Hace un GET a /usuarios/ pasando "nombre" como query param (?nombre=...).
 * A diferencia de obtenerUsuarioPorEmail, esta búsqueda puede devolver
 * varios resultados si hay coincidencias.
 * @param {string} nombre - Nombre o parte del nombre a buscar.
 * @returns {Promise<Array>} Arreglo con los usuarios que coinciden.
 * @throws {Error} Si la petición falla.
 */
export async function buscarUsuarioPorNombre(nombre) {
    const response = await fetch(`${BASE_URL}/usuarios/?nombre=${nombre}`);

    if (!response.ok) throw new Error('Error al buscar usuario');

    return await response.json();
}