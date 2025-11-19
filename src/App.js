// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProyectoScreen from "./screens/ProyectoScreen";
import SectorScreen from "./screens/SectorScreen";
import ViviendaScreen from "./screens/ViviendaScreen";
import FotosScreen from "./screens/FotosScreen";

function Navbar() {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#333", color: "#fff" }}>
      <Link to="/" style={{ color: "#fff", textDecoration: "none", marginRight: 20 }}>
        Vivienda2025
      </Link>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<ProyectoScreen />} />
          <Route path="/sector/:proyecto" element={<SectorScreen />} />
          <Route path="/vivienda/:proyecto/:sector" element={<ViviendaScreen />} />
          <Route path="/fotos/:proyecto/:vivienda/:sector" element={<FotosScreen />} />
        </Routes>
      </div>
    </Router>
  );
}
