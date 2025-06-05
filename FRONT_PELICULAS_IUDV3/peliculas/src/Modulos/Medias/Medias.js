import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerMedias, eliminarMedia, actualizarMedia } from "../../Servicios/apiServiceMedias";
import "../../Estilos/estilotablas.css";

export default function Medias() {
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    const data = await obtenerMedias();
    setDatos(data);
    setLoading(false);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿ELIMINAR ESTE MEDIO?")) {
      await eliminarMedia(id);
      cargarDatos();
    }
  };

  const handleActualizar = async (id, currentTitle, currentYear, currentDuration, currentStatus) => {
    const nuevoTitulo = prompt("INGRESE EL TITULO", currentTitle);
    if (!nuevoTitulo) return;

    const nuevoAnio = prompt("INGRESE AÑO DE ESTRENO", currentYear);
    if (!nuevoAnio || isNaN(nuevoAnio) || nuevoAnio < 1800 || nuevoAnio > new Date().getFullYear()) {
      alert("Año no válido. Debe ser un número entre 1800 y el año actual.");
      return;
    }

    const nuevaDuracion = prompt("INGRESA DURACIÓN (MIN):", currentDuration);
    if (!nuevaDuracion || isNaN(nuevaDuracion)) {
      alert("Duración no válida. Debe ser un número.");
      return;
    }

    const nuevoEstado = prompt("INGRESA ESTADO, (Activo / Inactivo):", currentStatus);
    if (nuevoEstado !== "Activo" && nuevoEstado !== "Inactivo") {
      alert("Estado no válido. Debe ser 'Activo' o 'Inactivo'.");
      return;
    }

    await actualizarMedia(id, {
      title: nuevoTitulo,
      releaseYear: parseInt(nuevoAnio),
      duration: parseInt(nuevaDuracion),
      status: nuevoEstado,
    });

    cargarDatos();
  };

  return (
    <div className="container">
      {/* <nav className="navbar">
        <h1>ADMINISTRADOR DE PELICULAS IUD DE ANTIOQUIA</h1>
        <button className="btn-volver" onClick={() => navigate("/")}>🏠 VOLVER AL INICIO</button>
      </nav> */}

      <div className="content">
        <div className="titilos">
        <h2 className="titulo">MEDIOS</h2>

        <button onClick={() => navigate("/nuevo-media")} className="btn-agregar">
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
                  <th>SERIAL</th>
                  <th>TITULO</th>
                  <th>AÑO ESTRENO</th>
                  <th>DURACION(MIN)</th>
                  <th>ESTADO</th>
                  <th>DATE CREACIÓN</th>
                  <th>DATE UPDATE</th>
                  <th>ACCIONES</th>                                    
                </tr>
              </thead>
              <tbody>
                {datos.map((media) => (
                  <tr key={media._id}>
                    <td>{media.serial}</td>
                    <td>{media.title}</td>
                    <td>{media.releaseYear}</td>
                    <td>{media.duration} min</td>
                    <td>
                      <span className={`estado ${media.status === "Activo" ? "activo" : "inactivo"}`}>
                        {media.status}
                      </span>
                    </td>                    
                    <td>{new Date(media.createdAt).toLocaleString()}</td>
                    <td>{new Date(media.updatedAt).toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleActualizar(media._id, media.title, media.releaseYear, media.duration, media.status)} className="btn-actualizar">
                        ACTUALIZAR
                      </button>
                      <button onClick={() => handleEliminar(media._id)} className="btn-eliminar">
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
      </footer>       */}
    </div>
  );
}