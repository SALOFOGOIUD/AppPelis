import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../Estilos/principal.css";

export default function Principal() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  if (!isLoggedIn) {
    return <p style={{ color: 'white', textAlign: 'center' }}>Acceso denegado. Inicia sesión para continuar.</p>;
  }

  const cards = [
    { nombre: "Directores", ruta: "/directores", icono: "🎬" },
    { nombre: "Géneros", ruta: "/generos", icono: "🎭" },
    { nombre: "Productoras", ruta: "/productores", icono: "🏢" },
    { nombre: "Tipos", ruta: "/types", icono: "📦" },
    { nombre: "Media", ruta: "/medias", icono: "📺" },
  ];

  return (
    <div className="panel-principal-container">
      <h1 className="panel-titulo">Panel Principal</h1>
      <p className="panel-descripcion">Bienvenido al sistema de administración de películas.</p>
      
      <div className="cards-grid">
        {cards.map((card, i) => (
          <div key={i} className="card" onClick={() => navigate(card.ruta)}>
            <div className="icono">{card.icono}</div>
            <h2>{card.nombre}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
