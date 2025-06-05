const API_URL = "http://localhost:4000/api/types";

/**
 * Obtener headers con token JWT si existe.
 */
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Obtener todos los tipos desde la API.
 */
export async function obtenerTipos() {
  try {
    const response = await fetch(API_URL, {
      headers: getAuthHeaders(), // Incluye el token si está
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener tipos:", error.message);
    return null;
  }
}

/**
 * Agregar un nuevo tipo.
 * @param {Object} nuevoTipo - Datos del nuevo tipo.
 */
export async function agregarTipo(nuevoTipo) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(), // ✅ Token incluido
      },
      body: JSON.stringify(nuevoTipo),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al agregar tipo:", error.message);
    return null;
  }
}

/**
 * Actualizar un tipo existente.
 * @param {string} id - ID del tipo a actualizar.
 * @param {Object} datosActualizados - Nuevos datos del tipo.
 */
export async function actualizarTipo(id, datosActualizados) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(), // ✅ Token incluido
      },
      body: JSON.stringify(datosActualizados),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al actualizar tipo:", error.message);
    return null;
  }
}

/**
 * Eliminar un tipo por su ID.
 * @param {string} id - ID del tipo a eliminar.
 */
export async function eliminarTipo(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(), // ✅ Token incluido
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar tipo:", error.message);
    return null;
  }
}