const BASE_URL = 'http://localhost:8003/ws';

export async function obtenerTodosUsuarios() {
    const response = await fetch(`${BASE_URL}/usuarios/`);
    if (!response.ok) throw new Error('Error al obtener usuarios');
    return await response.json();
}

export async function obtenerUsuarioPorEmail(email) {
    const response = await fetch(`${BASE_URL}/usuarios/email/${email}/`);
    if (!response.ok) throw new Error('Usuario no encontrado');
    return await response.json();
}

export async function buscarUsuarioPorNombre(nombre) {
    const response = await fetch(`${BASE_URL}/usuarios/?nombre=${nombre}`);
    if (!response.ok) throw new Error('Error al buscar usuario');
    return await response.json();
}
