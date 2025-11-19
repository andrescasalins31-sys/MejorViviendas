import axios from "axios";

// 👉 URL pública del backend en Render
const API = axios.create({
  baseURL: "https://backend-viviendas2025.onrender.com",
});

/* ============================================================
  UT VIVIENDAS 2025
============================================================ */
export const getBarriosViviendas2025 = async () => {
  const res = await API.get("/barrios");
  return res.data;
};

export const getViviendasViviendas2025 = async (barrio) => {
  const res = await API.get(`/viviendas?barrio=${encodeURIComponent(barrio)}`);
  return res.data;
};

export const getInfoViviendaViviendas2025 = async (cedula) => {
  const res = await API.get(`/info-vivienda?cedula=${cedula}`);
  return res.data;
};

/* ============================================================
  UT ANTIOQUIA 2025
============================================================ */
export const getBarriosAntioquia = async () => {
  const res = await API.get("/municipios-antioquia");
  return res.data;
};

export const getViviendasAntioquia = async (municipio) => {
  const res = await API.get(`/viviendas-antioquia?municipio=${encodeURIComponent(municipio)}`);
  return res.data;
};

export const getInfoViviendaAntioquia = async (cedula) => {
  const res = await API.get(`/info-vivienda-antioquia?cedula=${cedula}`);
  return res.data;
};

/* ============================================================
  SUBIR FOTO (AMBOS PROYECTOS)
============================================================ */
export const subirFoto = (formData) => {
  return API.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export default API;
