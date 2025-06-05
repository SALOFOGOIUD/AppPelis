import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerProducers, eliminarProducer, actualizarProducer } from "../../Servicios/apiServiceproductor";
import "../../Estilos/estilotablas.css";

export default function Producers() {
  const navigate = useNavigate();
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    const data = await obtenerProducers();
    setDatos(data);
    setLoading(false);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este Productor?")) {
      await eliminarProducer(id);
      cargarDatos();
    }
  };

  const handleActualizar = async (id, currentName, currentCountry, currentFoundedYear, currentStatus) => {
    const nuevoNombre = prompt("INGRESA EL NOMBRE DEL PRODUCTOR:", currentName);
    if (!nuevoNombre) return;

    const nuevoPais = prompt("INGRESA EL PAIS DEL PRODUCTOR", currentCountry);
    if (!nuevoPais) return;

    const nuevoAnio = prompt("INGRESE EL AÑO DE FUNDACIÓN", currentFoundedYear);
    if (!nuevoAnio || isNaN(nuevoAnio) || nuevoAnio < 1800 || nuevoAnio > new Date().getFullYear()) {
      alert("DEBE SER MAYOR A 1800 y el año actual.");
      return;
    }

    const nuevoEstado = prompt("INGRESA ESTADO (Activo / Inactivo):", currentStatus);
    if (nuevoEstado !== "Activo" && nuevoEstado !== "Inactivo") {
      alert("ESTADO NO VALIDO, 'Activo' o 'Inactivo'.");
      return;
    }

    await actualizarProducer(id, {
      name: nuevoNombre,
      country: nuevoPais,
      foundedYear: parseInt(nuevoAnio),
      status: nuevoEstado,
    });

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
        <h2 className="titulo">PRODUCTORES</h2>

        <button onClick={() => navigate("/nuevo-productor")} className="btn-agregar">
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
                  <th>PAIS</th>
                  <th>AÑO FUNDACIÓN</th>
                  <th>ESTADO</th>
                  <th>DATE CREACIÓN</th>
                  <th>DATE UPDATE</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((Producer) => (
                  <tr key={Producer._id}>
                    <td>{Producer.name}</td>
                    <td>{Producer.country}</td>
                    <td>{Producer.foundedYear}</td>
                    <td>
                      <span className={`estado ${Producer.status === "Activo" ? "activo" : "inactivo"}`}>
                        {Producer.status}
                      </span>
                    </td>
                    <td>{new Date(Producer.createdAt).toLocaleString()}</td>
                    <td>{new Date(Producer.updatedAt).toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleActualizar(Producer._id, Producer.name, Producer.country, Producer.foundedYear, Producer.status)} className="btn-actualizar">
                        ACTUALIZAR
                      </button>
                      <button onClick={() => handleEliminar(Producer._id)} className="btn-eliminar">
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