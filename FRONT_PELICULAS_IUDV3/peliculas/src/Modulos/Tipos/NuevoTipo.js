import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agregarTipo } from "../../Servicios/apiServiceTypes";
import "../../Estilos/Formularionuevosdatos.css";

export default function NuevoTipo() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !descripcion.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const nuevoTipo = {
      name: nombre,
      description: descripcion,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await agregarTipo(nuevoTipo);
    navigate("/types"); // Redirige a la lista de tipos
  };

  return (
    <div className="form-container">
      <h2>Agregar Nuevo Tipo</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Descripción:</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />

        <button type="submit">Guardar</button>
        <button type="button" onClick={() => navigate("/types")} className="btn-cancel">
          Cancelar
        </button>
      </form>
    </div>
  );
}
