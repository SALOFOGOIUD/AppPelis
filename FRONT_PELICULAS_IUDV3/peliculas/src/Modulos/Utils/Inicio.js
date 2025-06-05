import React from "react";
import "../../Estilos/Inicio.css";

export default function Inicio() {
  return (
    <div className="inicio-container">
      <div className="imagen-superior">
        <img src="/cartelera.jpg" alt="Cartelera de Películas" className="imagen-fondo" />
        <div className="inicio-overlay">
          <div className="contenido">
            {/* <h1 className="titulo">Administrador de Películas IUD de Antioquia</h1> */}
            <p className="descripcion">
              Esta aplicación web está diseñada para administrar el catálogo de productos de una aplicación tipo Cuevana.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
