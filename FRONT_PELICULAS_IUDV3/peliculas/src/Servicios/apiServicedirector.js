const API_URL = "http://localhost:4000/api/directors";

/**
 * Obtiene el token JWT almacenado.
 */
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}

/**
 * Obtener todos los directores desde la API.
 */
export async function obtenerDatos() {
  try {
    const response = await fetch(API_URL, {
      headers: getAuthHeaders(), // ✅ Token incluido si existe
    });
    return await response.json();
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
}

/**
 * Agregar un nuevo director.
 * @param {Object} nuevoDirector - Datos del nuevo director.
 */
export async function agregarDirector(nuevoDirector) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(), // ✅ Token incluido
      },
      body: JSON.stringify(nuevoDirector),
    });
    return await response.json();
  } catch (error) {
    console.error("Error al agregar director:", error);
    return null;
  }
}

/**
 * Actualizar un director existente.
 * @param {string} id - ID del director a actualizar.
 * @param {Object} datosActualizados - Nuevos datos del director.
 */
export async function actualizarDirector(id, datosActualizados) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(), // ✅ Token incluido
      },
      body: JSON.stringify(datosActualizados),
    });
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar director:", error);
    return null;
  }
}

/**
 * Eliminar un director por su ID.
 * @param {string} id - ID del director a eliminar.
 */
export async function eliminarDirector(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(), // ✅ Token incluido
    });
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar director:", error);
    return null;
  }
}