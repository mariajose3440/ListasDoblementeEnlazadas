const BASE_URL = "http://localhost:8004/ws/catalogo";

export async function obtenerVideos(preferencias = []) {
    const url = new URL(`${BASE_URL}/videos/`);

    preferencias.forEach((preferencia) => {
        if (preferencia?.trim()) {
            url.searchParams.append("preferencia", preferencia.trim());
        }
    });

    const response = await fetch(url);

    if (!response.ok)
        throw new Error("Error al obtener videos");

    return await response.json();
}
