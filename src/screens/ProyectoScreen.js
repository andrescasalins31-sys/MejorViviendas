import React from 'react';
import { View, Button } from 'react-native';

export default function ProyectoScreen({ navigation }) {
  const seleccionarProyecto = (proyecto) => {
    navigation.navigate('Sector', { proyecto });
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="UT VIVIENDAS 2025" onPress={() => seleccionarProyecto('Viviendas2025')} />
      <Button title="UT ANTIOQUIA 2025" onPress={() => seleccionarProyecto('Antioquia2025')} />
    </View>
  );
}