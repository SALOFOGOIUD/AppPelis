// src/Modulos/Utils/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Footer from "./footer/footer";

export default function Layout() {
  return (
    <div className="inicio-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main>
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
      <Footer />
    </div>
  );
}
