import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agregarDirector } from "../../Servicios/apiServicedirector";
import "../../Estilos/Formularionuevosdatos.css";

export default function NuevoDirector() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("Activo");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoDirector = {
      name: nombre,
      status: estado,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await agregarDirector(nuevoDirector);
    navigate("/directores");
  };

  return (
    <div className="form-container">
      <h2>Agregar Nuevo Director</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Estado:</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>

        <button type="submit">Guardar</button>
        <button type="button" onClick={() => navigate("/directores")} className="btn-cancel">
          Cancelar
        </button>
      </form>
    </div>
  );
}