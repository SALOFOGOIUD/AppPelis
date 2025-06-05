import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerDatos, eliminarGenero, actualizarGenero } from "../../Servicios/apiServiceGenero";
import "../../Estilos/estilotablas.css";

export default function Generos() {
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
    if (window.confirm("¿QUIERES ELIMINAR ESTE GENERO?")) {
      await eliminarGenero(id);
      cargarDatos();
    }
  };

  const handleActualizar = async (id, currentName, currentStatus, currentDescripcion) => {
    const nuevoNombre = prompt("INGRESA NUEVO NOMBRE", currentName);
    if (!nuevoNombre) return;
    const nuevoEstado = prompt("INGRESA NUEVO ESTADO (Activo / Inactivo):", currentStatus);
    if (nuevoEstado !== "Activo" && nuevoEstado !== "Inactivo") 
      {alert("ESTADO NO VALIDO, 'Activo' o 'Inactivo'.");
      return;}
    const nuevaDescripcion = prompt("INGRESA LA DESCRIPCION",currentDescripcion);
    if(!nuevaDescripcion) return;
    await actualizarGenero(id, { name: nuevoNombre, status: nuevoEstado, description: nuevaDescripcion});
    cargarDatos();
  };

  return (
    <div className="container">
      {/* Encabezado */}
      {/* <nav className="navbar">
        <h1>ADMINISTRADOR DE PELICULAS IUD DE ANTIOQUIA</h1>
        <button className="btn-volver" onClick={() => navigate("/")}>🏠 VOLVER AL INICIO</button>
      </nav> */}

      <div className="content">
        <div className="titilos">
        <h2 className="titulo">GENEROS</h2>

        <button onClick={() => navigate("/nuevo-Genero")} className="btn-agregar">
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
                  <th>DESCRIPCION</th>
                  <th>DATE CREACIÓN</th>
                  <th>DATE UPDATE</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((Genero) => (
                  <tr key={Genero._id}>
                    <td>{Genero.name}</td>
                    <td>
                      <span className={`estado ${Genero.status === "Activo" ? "activo" : "inactivo"}`}>
                        {Genero.status}
                      </span>
                    </td>
                    <td>{Genero.description}</td>
                    <td>{new Date(Genero.createdAt).toLocaleString()}</td>
                    <td>{new Date(Genero.updatedAt).toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleActualizar(Genero._id)} className="btn-actualizar">
                        ACTUALIZAR
                      </button>
                      <button onClick={() => handleEliminar(Genero._id)} className="btn-eliminar">
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