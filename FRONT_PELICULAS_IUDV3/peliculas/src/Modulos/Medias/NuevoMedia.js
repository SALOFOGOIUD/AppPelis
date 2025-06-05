import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { agregarMedia } from "../../Servicios/apiServiceMedias";
import { obtenerTipos } from "../../Servicios/apiServiceTypes";
import { obtenerDatos as obtenerDirectores } from "../../Servicios/apiServicedirector";
import { obtenerProducers } from "../../Servicios/apiServiceproductor";
import { obtenerDatos as obtenerGeneros } from "../../Servicios/apiServiceGenero";
import "../../Estilos/Formularionuevosdatos.css";

export default function NuevoMedia() {
  const navigate = useNavigate();

  // Estados para el formulario
  const [serial, setSerial] = useState("");
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [director, setDirector] = useState("");
  const [productor, setProductor] = useState("");
  const [genero, setGenero] = useState("");
  const [anio, setAnio] = useState("");
  const [duracion, setDuracion] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [estado, setEstado] = useState("Activo");

  // Estados para opciones de selección
  const [tipos, setTipos] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [producers, setProducers] = useState([]);
  const [generos, setGeneros] = useState([]);

  // Cargar datos al iniciar
  useEffect(() => {
    async function cargarOpciones() {
      setTipos(await obtenerTipos() || []);
      setDirectores(await obtenerDirectores() || []);
      setProducers(await obtenerProducers() || []);
      setGeneros(await obtenerGeneros() || []);
    }
    cargarOpciones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serial || isNaN(serial) || parseInt(serial) <= 0) {
      alert("Por favor, ingrese un número de serie válido (mayor a 0).");
      return;
    }

    if (!titulo.trim() || !tipo || !director || !productor || !genero || !anio || !duracion || !sinopsis.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (isNaN(anio) || anio < 1800 || anio > new Date().getFullYear()) {
      alert("Año no válido. Debe ser un número entre 1800 y el año actual.");
      return;
    }

    if (isNaN(duracion) || duracion <= 0) {
      alert("Duración no válida. Debe ser un número positivo.");
      return;
    }

    const nuevoMedia = {
      serial: parseInt(serial),
      title: titulo,
      type: tipo,
      director: director,
      producer: productor,
      genre: genero,
      releaseYear: parseInt(anio),
      duration: parseInt(duracion),
      synopsis: sinopsis,
      status: estado,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await agregarMedia(nuevoMedia);
    navigate("/medias");
  };

  return (
    <div className="form-container">
      <h2>Agregar Nuevo Medio</h2>
      <form onSubmit={handleSubmit}>
        <label>Número de Serie:</label>
        <input type="number" value={serial} onChange={(e) => setSerial(e.target.value)} required />

        <label>Título:</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />

        <label>Tipo:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
          <option value="">Seleccione un tipo</option>
          {tipos.map((t) => (
            <option key={t._id} value={t._id}>{t.name}</option>
          ))}
        </select>

        <label>Director:</label>
        <select value={director} onChange={(e) => setDirector(e.target.value)} required>
          <option value="">Seleccione un director</option>
          {directores.map((d) => (
            <option key={d._id} value={d._id}>{d.name}</option>
          ))}
        </select>

        <label>Productor:</label>
        <select value={productor} onChange={(e) => setProductor(e.target.value)} required>
          <option value="">Seleccione un productor</option>
          {producers.map((p) => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>

        <label>Género:</label>
        <select value={genero} onChange={(e) => setGenero(e.target.value)} required>
          <option value="">Seleccione un género</option>
          {generos.map((g) => (
            <option key={g._id} value={g._id}>{g.name}</option>
          ))}
        </select>

        <label>Año de Estreno:</label>
        <input type="number" value={anio} onChange={(e) => setAnio(e.target.value)} required />

        <label>Duración (minutos):</label>
        <input type="number" value={duracion} onChange={(e) => setDuracion(e.target.value)} required />

        <label>Sinopsis:</label>
        <textarea value={sinopsis} onChange={(e) => setSinopsis(e.target.value)} required />

        <label>Estado:</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>

        <button type="submit">Guardar</button>
        <button type="button" onClick={() => navigate("/medias")} className="btn-cancel">
          Cancelar
        </button>
      </form>
    </div>
  );
}