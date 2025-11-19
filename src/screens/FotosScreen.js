import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { subirFoto } from "../api/api";

const AREAS = ["Fachada","Sala","Cocina","Bano_1","Bano_2","Bano_3","Habitacion_1","Habitacion_2","Habitacion_3","Habitacion_4","Habitacion_5","Area_labores","Patio"];

export default function FotosScreen() {
  const { proyecto, vivienda, sector } = useParams();
  const { state } = useLocation();
  const { nombre, zona } = state || {};

  const [area, setArea] = useState("");
  const [file, setFile] = useState(null);
  const [tipoFoto, setTipoFoto] = useState("Antes");

  const handleFile = (e) => setFile(e.target.files[0]);

  const guardarFoto = async () => {
    if (!file || !area) return alert("Selecciona área y archivo");
    const formData = new FormData();
    formData.append("foto", file);
    formData.append("tipo", tipoFoto);
    formData.append("vivienda", vivienda);
    formData.append("nombre", nombre);
    formData.append("sector", sector);
    formData.append("proyecto", proyecto);
    if (proyecto === "Antioquia2025") formData.append("zonaIntervencion", zona);

    try {
      const res = await subirFoto(formData);
      alert("Foto subida: " + res.data.link);
      setFile(null);
      setArea("");
    } catch (e) {
      alert("Error subiendo foto");
    }
  };

  return (
    <div>
      <h3>{nombre} - {vivienda}</h3>
      <p>Área:</p>
      <select value={area} onChange={(e) => setArea(e.target.value)}>
        <option value="">Seleccionar Área</option>
        {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
      </select>
      <p>Tipo de foto:</p>
      <select value={tipoFoto} onChange={(e) => setTipoFoto(e.target.value)}>
        <option value="Antes">Antes</option>
        <option value="Durante">Durante</option>
        <option value="Después">Después</option>
      </select>
      <p>Archivo:</p>
      <input type="file" accept="image/*" onChange={handleFile} />
      <br /><br />
      <button onClick={guardarFoto}>Subir Foto</button>
    </div>
  );
}
