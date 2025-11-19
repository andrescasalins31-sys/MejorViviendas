import React, { useState } from 'react';
import { View, Text, Image, Alert, ScrollView } from 'react-native';
import { Button, RadioButton, Menu, Divider, Provider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { subirFoto } from '../src/api/api';

const AREAS = [
  "Fachada", "Sala", "Cocina", "Bano_1", "Bano_2", "Bano_3",
  "Habitacion_1", "Habitacion_2", "Habitacion_3", "Habitacion_4", "Habitacion_5",
  "Area_labores", "Patio"
];

export default function FotosScreen({ route }) {

  const { proyecto, vivienda, nombre, sector, direccion, zona } = route.params;

  // 👉 municipio o barrio según proyecto
  const sectorReal = proyecto === "Antioquia2025" ? sector : sector;

  const [tipoFoto, setTipoFoto] = useState("Antes");
  const [area, setArea] = useState(null);
  const [image, setImage] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const abrirMenu = () => setMenuVisible(true);
  const cerrarMenu = () => setMenuVisible(false);
  const seleccionarArea = (a) => {
    setArea(a);
    cerrarMenu();
  };

  // SELECCIONAR IMAGEN
  const seleccionarImagen = async (fromCamera = true) => {
    if (!area) return Alert.alert("Selecciona un área", "Debes elegir el área primero.");

    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({ quality: 0.6 });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({ quality: 0.6 });
    }

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
    }
  };

  // SUBIR FOTO
  const guardarFoto = async () => {
    if (!image) return Alert.alert("No hay foto", "Primero selecciona o toma una foto.");
    if (!area) return Alert.alert("Falta área", "Selecciona el área de la foto.");

    try {
      const formData = new FormData();

      formData.append("foto", {
        uri: image,
        type: "image/jpeg",
        name: `${area}.jpg`,
      });

      // DATOS PARA BACKEND
      formData.append("tipo", tipoFoto);
      formData.append("vivienda", vivienda);
      formData.append("nombre", nombre);
      formData.append("sector", sectorReal);    // municipio o barrio
      formData.append("direccion", direccion || "SIN DIRECCIÓN");
      formData.append("area", area);
      formData.append("proyecto", proyecto);

      // Antioquia necesita zona
      if (proyecto === "Antioquia2025") {
        formData.append("zonaIntervencion", zona);  // rural o urbana
      }

      const response = await subirFoto(formData);

      console.log("Respuesta backend:", response.data);
      Alert.alert("Éxito", "Foto subida correctamente ✔");

      setImage(null);
      setArea(null);

    } catch (error) {
      console.log("Error subiendo foto:", error.response?.data || error.message);
      Alert.alert("Error", "No se pudo subir la foto.");
    }
  };

  return (
    <Provider>
      <ScrollView contentContainerStyle={{ padding: 20 }}>

        {/* INFO GENERAL */}
        <Text style={{ fontSize: 20, marginBottom: 5 }}>Vivienda: {nombre}</Text>
        <Text style={{ fontSize: 16 }}>Cédula: {vivienda}</Text>
        <Text style={{ fontSize: 16 }}>
          {proyecto === "Antioquia2025" ? "Municipio" : "Barrio"}: {sectorReal}
        </Text>

        {proyecto === "Antioquia2025" && (
          <Text style={{ fontSize: 16 }}>Zona: {zona}</Text>
        )}

        <Text style={{ fontSize: 16, marginBottom: 10 }}>Dirección: {direccion}</Text>

        {/* Tipo de foto */}
        <Text style={{ fontWeight: 'bold' }}>Tipo de foto:</Text>
        <RadioButton.Group onValueChange={setTipoFoto} value={tipoFoto}>
          <RadioButton.Item label="Antes" value="Antes" />
          <RadioButton.Item label="Durante" value="Durante" />
          <RadioButton.Item label="Después" value="Después" />
        </RadioButton.Group>

        <Divider style={{ marginVertical: 10 }} />

        {/* Selección del Área */}
        <Menu
          visible={menuVisible}
          onDismiss={cerrarMenu}
          anchor={
            <Button mode="outlined" onPress={abrirMenu}>
              {area ? `Área: ${area}` : "Seleccionar Área"}
            </Button>
          }
        >
          {AREAS.map((a, i) => (
            <Menu.Item key={i} onPress={() => seleccionarArea(a)} title={a} />
          ))}
        </Menu>

        <Divider style={{ marginVertical: 10 }} />

        {/* Botones */}
        <Button mode="contained" onPress={() => seleccionarImagen(true)} style={{ marginTop: 20 }}>
          Tomar Foto
        </Button>

        <Button mode="outlined" onPress={() => seleccionarImagen(false)} style={{ marginTop: 10 }}>
          Cargar desde Galería
        </Button>

        <Button mode="contained" onPress={guardarFoto} style={{ marginTop: 10, backgroundColor: 'green' }}>
          Guardar Foto
        </Button>

        {/* Vista previa */}
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: '100%', height: 300, marginTop: 20 }}
          />
        )}

      </ScrollView>
    </Provider>
  );
}
