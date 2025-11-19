import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getViviendasViviendas2025,
  getViviendasAntioquia
} from "../api/api";

export default function ViviendaScreen() {
  const { proyecto, sector } = useParams();
  const navigate = useNavigate();
  const [viviendas, setViviendas] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchViviendas() {
      let data = [];
      if (proyecto === "Viviendas2025") data = await getViviendasViviendas2025(sector);
      if (proyecto === "Antioquia2025") data = await getViviendasAntioquia(sector);
      setViviendas(data);
    }
    fetchViviendas();
  }, [proyecto, sector]);

  const filtered = viviendas.filter(v => {
    const ced = v["C.C"] || v["DOCUMENTO DE IDENTIDAD"] || "";
    const nom = v["NOMBRE COMPLETO"] ? v["NOMBRE COMPLETO"].toLowerCase() : "";
    return ced.includes(search) || nom.includes(search.toLowerCase());
  });

  return (
    <div>
      <input
        placeholder="Buscar por cédula o nombre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 10, padding: 5 }}
      />
      {filtered.map((v) => {
        const ced = v["C.C"] || v["DOCUMENTO DE IDENTIDAD"];
        const nombre = v["NOMBRE COMPLETO"] || "SIN NOMBRE";
        const zona = v["ZONA INTERVENCION"] || "URBANA";
        return (
          <div key={ced} style={{ marginBottom: 10 }}>
            <button
              onClick={() => navigate(`/fotos/${proyecto}/${ced}/${sector}`, { state: { nombre, zona } })}
            >
              {nombre} - {ced}
            </button>
          </div>
        );
      })}
    </div>
  );
}
