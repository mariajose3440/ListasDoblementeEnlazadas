const BASE_URL = "http://localhost:8004/ws/catalogo";

export async function obtenerVideos() {

    const response = await fetch(`${BASE_URL}/videos/`);

    if (!response.ok)
        throw new Error("Error al obtener videos");

    return await response.json();
}