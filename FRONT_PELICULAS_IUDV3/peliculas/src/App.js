import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Layout from "./Modulos/Utils/Layout";
import Inicio from "./Modulos/Utils/Inicio";
import Principal from "./Modulos/Utils/Principal/principal";
import PrivateRoute from "./Modulos/Utils/Principal/PrivateRoute";

import Directores from "./Modulos/Directores/Directores";
import NuevoDirector from "./Modulos/Directores/nuevodirector";
import Generos from "./Modulos/Generos/Generos";
import NuevoGenero from "./Modulos/Generos/nuevogenero";
import Productores from "./Modulos/Productores/Productores";
import NuevoProductor from "./Modulos/Productores/nuevoproductor";
import Types from "./Modulos/Tipos/Types"; 
import NuevoTipo from "./Modulos/Tipos/NuevoTipo";
import Medias from "./Modulos/Medias/Medias";
import NuevoMedia from "./Modulos/Medias/NuevoMedia";

const clientId = "757470978448-8sp8rbnl0ffpt5rfnh3k59dokm675s91.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          {/* Ruta pública con layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Inicio />} />

            {/* Rutas protegidas dentro del mismo layout */}
            <Route 
              path="dashboard" 
              element={<PrivateRoute><Principal /></PrivateRoute>} 
            />
            <Route 
              path="directores" 
              element={<PrivateRoute><Directores /></PrivateRoute>} 
            />
            <Route 
              path="nuevo-director" 
              element={<PrivateRoute><NuevoDirector /></PrivateRoute>} 
            />
            <Route 
              path="generos" 
              element={<PrivateRoute><Generos /></PrivateRoute>} 
            />
            <Route 
              path="nuevo-genero" 
              element={<PrivateRoute><NuevoGenero /></PrivateRoute>} 
            />
            <Route 
              path="productores" 
              element={<PrivateRoute><Productores /></PrivateRoute>} 
            />
            <Route 
              path="nuevo-productor" 
              element={<PrivateRoute><NuevoProductor /></PrivateRoute>} 
            />
            <Route 
              path="types" 
              element={<PrivateRoute><Types /></PrivateRoute>} 
            />
            <Route 
              path="nuevo-tipo" 
              element={<PrivateRoute><NuevoTipo /></PrivateRoute>} 
            />
            <Route 
              path="medias" 
              element={<PrivateRoute><Medias /></PrivateRoute>} 
            />
            <Route 
              path="nuevo-media" 
              element={<PrivateRoute><NuevoMedia /></PrivateRoute>} 
            />
          </Route>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
