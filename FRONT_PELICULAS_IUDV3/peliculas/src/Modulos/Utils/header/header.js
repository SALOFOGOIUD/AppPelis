import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { login, registro, loginConGoogle } from "../../../Servicios/authService";
import "../../../Estilos/Inicio.css";

export default function Header() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modo, setModo] = useState("login");
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [nombre, setNombre] = useState("");
  const [confirmarClave, setConfirmarClave] = useState("");
  const [rol, setRol] = useState("usuario"); // NUEVO
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const abrirModal = () => {
    setMensaje("");
    setMostrarModal(true);
    setModo("login");
    limpiarCampos();
  };

  const cerrarModal = () => setMostrarModal(false);

  const limpiarCampos = () => {
    setEmail("");
    setClave("");
    setNombre("");
    setConfirmarClave("");
    setRol("usuario"); // NUEVO
    setMensaje("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("");
    setCargando(true);
    try {
      const data = await login(email, clave);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
      cerrarModal();
    } catch (error) {
      setMensaje(error.message || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setMensaje("");
    if (clave !== confirmarClave) {
      setMensaje("Las contraseñas no coinciden");
      return;
    }
    setCargando(true);
    try {
      await registro({ nombre, email, clave, rol }); // ACTUALIZADO
      setMensaje("Registro exitoso, ahora puedes iniciar sesión");
      limpiarCampos();
      setModo("login");
    } catch (error) {
      setMensaje(error.message || "Error en el registro");
    } finally {
      setCargando(false);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    setMensaje("");
    setCargando(true);
    try {
      const data = await loginConGoogle(idToken);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
      cerrarModal();
    } catch (error) {
      setMensaje("Error en login con Google");
    } finally {
      setCargando(false);
    }
  };

  const handleError = () => {
    setMensaje("Error al iniciar sesión con Google");
  };

  return (
    <header className="header-principal">
      <div className="area-login">
        {localStorage.getItem("token") && (
          location.pathname !== "/" ? (
            <button onClick={() => navigate(-1)} className="boton-volver">
              ← Volver
            </button>
          ) : (
            <button onClick={() => navigate("/dashboard")} className="boton-volver">
              Ir al Dashboard
            </button>
          )
        )}

        <div className="titulo-app">
          <h1>Administrador de Películas IUD de Antioquia</h1>
        </div>

        {localStorage.getItem("token") ? (
          <button onClick={cerrarSesion} className="boton-login">
            Cerrar sesión
          </button>
        ) : (
          <button onClick={abrirModal} className="boton-login">
            Iniciar sesión
          </button>
        )}
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <span className="modal-cerrar" onClick={cerrarModal}>
              &times;
            </span>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <button
                style={{
                  backgroundColor: modo === "login" ? "#ff4500" : "transparent",
                  color: modo === "login" ? "white" : "#000",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "6px 6px 0 0",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setModo("login");
                  setMensaje("");
                  limpiarCampos();
                }}
              >
                Iniciar sesión
              </button>
              <button
                style={{
                  backgroundColor: modo === "registro" ? "#ff4500" : "transparent",
                  color: modo === "registro" ? "white" : "#000",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "6px 6px 0 0",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setModo("registro");
                  setMensaje("");
                  limpiarCampos();
                }}
              >
                Registrarse
              </button>
            </div>

            {modo === "login" && (
              <>
                <h2>Iniciar sesión</h2>
                <form onSubmit={handleLogin}>
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    required
                  />
                  <button type="submit" disabled={cargando}>
                    {cargando ? "Ingresando..." : "Ingresar"}
                  </button>
                </form>
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                  <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                </div>
              </>
            )}

            {modo === "registro" && (
              <>
                <h2>Registrarse</h2>
                <form onSubmit={handleRegistro}>
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmarClave}
                    onChange={(e) => setConfirmarClave(e.target.value)}
                    required
                  />
                  <select value={rol} onChange={(e) => setRol(e.target.value)} required>
                    <option value="usuario">Usuario</option>
                    <option value="docente">Docente</option>
                    <option value="administrador">Administrador</option>
                  </select>
                  <button type="submit" disabled={cargando}>
                    {cargando ? "Registrando..." : "Registrar"}
                  </button>
                </form>
              </>
            )}

            {mensaje && (
              <p style={{ marginTop: "10px", color: "red", textAlign: "center" }}>
                {mensaje}
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
}