const API_URL = "http://localhost:4000/api/auth";

async function parseJSONResponse(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Respuesta no JSON: ${text}`);
  }
}

export async function login(email, clave) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, clave }),
  });
  const data = await parseJSONResponse(res);
  if (!res.ok) {
    throw new Error(data.message || "Error en login");
  }
  return data; // { token, usuario, message }
}

export async function signup(email, nombre, clave, rol) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, nombre, clave, rol }),
  });
  const data = await parseJSONResponse(res);
  if (!res.ok) {
    throw new Error(data.message || "Error en signup");
  }
  return data; // { message, usuario }
}

export async function registro({ nombre, email, clave,rol }) {
  const res = await fetch(`${API_URL}/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, clave,rol }),
  });
  const data = await parseJSONResponse(res);
  if (!res.ok) {
    throw new Error(data.message || "Error en registro");
  }
  return data;
}

export async function loginConGoogle(idToken) {
  const res = await fetch(`${API_URL}/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al iniciar sesión con Google");
  }
  return data;
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}
