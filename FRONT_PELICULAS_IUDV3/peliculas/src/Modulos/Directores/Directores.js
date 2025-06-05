import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerDatos, eliminarDirector, actualizarDirector } from "../../Servicios/apiServicedirector";
import "../../Estilos/estilotablas.css";

export default function Directores() {
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    const data = await obtenerDatos();
    setDatos(data);
    setLoading(false);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿QUIERES ELIMINAR ESTE DIRECTOR?")) {
      await eliminarDirector(id);
      cargarDatos();
    }
  };

  const handleActualizar = async (id, currentName, currentStatus) => {
    const nuevoNombre = prompt("INGRESA NUEVO NOMBRE:", currentName);
    if (!nuevoNombre) return;
  
    const nuevoEstado = prompt("INGRESA NUEVO ESTADO (Activo / Inactivo):", currentStatus);
    if (nuevoEstado !== "Activo" && nuevoEstado !== "Inactivo") {
      alert("ESTADO NO VALIDO 'Activo' o 'Inactivo'.");
      return;
    }
  
    await actualizarDirector(id, { name: nuevoNombre, status: nuevoEstado });
    cargarDatos();
  };

  return (
    <div className="container">
      {/* Encabezado */}
      {/* <nav className="navbar">
        <h1>ADMINISTRADOR DE PELICULAS IUD DE ANTIOQUIA</h1>
        <button className="btn-volver" onClick={() => navigate("/")}>🏠 VOLVER AL INICIO</button>
      </nav> */}

      {/* Contenido Principal */}
      <div className="content">
        
        <div className="titilos">
          <h2 className="titulo">DIRECTORES</h2>
          <button onClick={() => navigate("/nuevo-director")} className="btn-agregar">
            NUEVO REGISTRO
          </button>
        </div>

        {loading ? (
          <p className="cargando">CARGANDO DATOS...</p>
        ) : (
          <div className="tabla-container">
            <table className="tabla">
              <thead>
                <tr>
                  <th>NOMBRE</th>
                  <th>ESTADO</th>
                  <th>DATE CREACIÓN</th>
                  <th>DATE UPDATE</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((director) => (
                  <tr key={director._id}>
                    <td>{director.name}</td>
                    <td>
                      <span className={`estado ${director.status === "Activo" ? "activo" : "inactivo"}`}>
                        {director.status}
                      </span>
                    </td>
                    <td>{new Date(director.createdAt).toLocaleString()}</td>
                    <td>{new Date(director.updatedAt).toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleActualizar(director._id)} className="btn-actualizar">
                        ACTUALIZAR
                      </button>
                      <button onClick={() => handleEliminar(director._id)} className="btn-eliminar">
                        ELIMINAR
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* <footer className="footer">
        <p>© 2025 Películas IUD ADM. Todos los derechos reservados.</p>
        <p>Desarrollado por <strong>Salomón Forero</strong></p>
        <p>Estudiante Desarrollo de Software - Data Expert Lead</p>
      </footer> */}
    </div>
  );
}