import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agregarProducer } from "../../Servicios/apiServiceproductor";
import "../../Estilos/Formularionuevosdatos.css";

export default function NuevoProductor() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [pais, setPais] = useState("");
  const [fundacion, setFundacion] = useState("");
  const [estado, setEstado] = useState("Activo");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !pais.trim() || !fundacion.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (isNaN(fundacion) || fundacion < 1800 || fundacion > new Date().getFullYear()) {
      alert("Año de fundación no válido. Debe ser un número entre 1800 y el año actual.");
      return;
    }

    const nuevoProductor = {
      name: nombre,
      country: pais,
      foundedYear: parseInt(fundacion),
      status: estado,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await agregarProducer(nuevoProductor);
    navigate("/productores");
  };

  return (
    <div className="form-container">
      <h2>Agregar Nuevo Productor</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>País de Origen:</label>
        <input
          type="text"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
          required
        />

        <label>Año de Fundación:</label>
        <input
          type="number"
          value={fundacion}
          onChange={(e) => setFundacion(e.target.value)}
          required
        />

        <label>Estado:</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>

        <button type="submit">Guardar</button>
        <button type="button" onClick={() => navigate("/productores")} className="btn-cancel">
          Cancelar
        </button>
      </form>
    </div>
  );
}
