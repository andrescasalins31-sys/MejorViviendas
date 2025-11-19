import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBarriosViviendas2025, getBarriosAntioquia } from "../src/api/api";

export default function SectorScreen() {
  const { proyecto } = useParams();
  const navigate = useNavigate();
  const [sectores, setSectores] = useState([]);

  useEffect(() => {
    async function fetchSectores() {
      let data = [];
      if (proyecto === "Viviendas2025") data = await getBarriosViviendas2025();
      else if (proyecto === "Antioquia2025") data = await getBarriosAntioquia();
      setSectores(data);
    }
    fetchSectores();
  }, [proyecto]);

  return (
    <div>
      {sectores.map((s, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <button onClick={() => navigate(`/vivienda/${proyecto}/${s}`)}>{s}</button>
        </div>
      ))}
    </div>
  );
}
