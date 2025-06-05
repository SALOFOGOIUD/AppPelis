import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerTipos, eliminarTipo, actualizarTipo } from "../../Servicios/apiServiceTypes";
import "../../Estilos/estilotablas.css";

export default function Types() {
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    const data = await obtenerTipos();
    setDatos(data);
    setLoading(false);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este Tipo?")) {
      await eliminarTipo(id);
      cargarDatos();
    }
  };

  const handleActualizar = async (id, currentName, currentDescription) => {
    const nuevoNombre = prompt("Ingrese el nuevo nombre:", currentName);
    if (!nuevoNombre) return;

    const nuevaDescripcion = prompt("Ingrese la nueva descripción:", currentDescription);
    if (!nuevaDescripcion) return;

    await actualizarTipo(id, { name: nuevoNombre, description: nuevaDescripcion });
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
        <h2 className="titulo">TIPOS</h2>

        <button onClick={() => navigate("/nuevo-tipo")} className="btn-agregar">
          NUEVO REGISTRO
        </button>
</div>
        {loading ? (
          <p className="cargando">CARGANDO DATOS..</p>
        ) : (
          <div className="tabla-container">
            <table className="tabla">
              <thead>
                <tr>
                  <th>NOMBRE</th>
                  <th>DESCRIPCIÓN</th>
                  <th>DATE CREACIÓN</th>
                  <th>DATE UPDATE</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((tipo) => (
                  <tr key={tipo._id}>
                    <td>{tipo.name}</td>
                    <td>{tipo.description}</td>
                    <td>{new Date(tipo.createdAt).toLocaleString()}</td>
                    <td>{new Date(tipo.updatedAt).toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleActualizar(tipo._id, tipo.name, tipo.description)} className="btn-actualizar">
                        ACTUALIZAR
                      </button>
                      <button onClick={() => handleEliminar(tipo._id)} className="btn-eliminar">
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
