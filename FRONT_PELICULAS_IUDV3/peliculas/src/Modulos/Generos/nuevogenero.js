import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agregarGenero } from "../../Servicios/apiServiceGenero";
import "../../Estilos/Formularionuevosdatos.css";

export default function NuevoGenero() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !descripcion.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const nuevoGenero = {
      name: nombre,
      status: estado,
      description: descripcion,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await agregarGenero(nuevoGenero);
    navigate("/generos"); // Redirige a la lista de géneros
  };

  return (
    <div className="form-container">
      <h2>Agregar Nuevo Género</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <label>Estado:</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>

        <button type="submit">Guardar</button>
        <button type="button" onClick={() => navigate("/generos")} className="btn-cancel">
          Cancelar
        </button>
      </form>
    </div>
  );
}