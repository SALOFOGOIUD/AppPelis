const API_URL = "http://localhost:4000/api/genres";

/**
 * Obtiene los headers de autenticación con token.
 */
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Obtener todos los géneros desde la API.
 */
export async function obtenerDatos() {
  try {
    const response = await fetch(API_URL, {
      headers: getAuthHeaders(), // ✅ Incluir token si existe
    });
    return await response.json();
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
}

/**
 * Agregar un nuevo género.
 * @param {Object} nuevoGenero - Datos del nuevo género.
 */
export async function agregarGenero(nuevoGenero) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(), // ✅ Incluir token
      },
      body: JSON.stringify(nuevoGenero),
    });
    return await response.json();
  } catch (error) {
    console.error("Error al agregar género:", error);
    return null;
  }
}

/**
 * Actualizar un género existente.
 * @param {string} id - ID del género a actualizar.
 * @param {Object} datosActualizados - Nuevos datos del género.
 */
export async function actualizarGenero(id, datosActualizados) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(), // ✅ Incluir token
      },
      body: JSON.stringify(datosActualizados),
    });
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar género:", error);
    return null;
  }
}

/**
 * Eliminar un género por su ID.
 * @param {string} id - ID del género a eliminar.
 */
export async function eliminarGenero(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(), // ✅ Incluir token
    });
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar género:", error);
    return null;
  }
}