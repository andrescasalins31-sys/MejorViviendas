import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProyectoScreen from '../screens/ProyectoScreen';
import SectorScreen from '../screens/SectorScreen';
import ViviendaScreen from '../screens/ViviendaScreen';
import FotosScreen from '../screens/FotosScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Proyecto" component={ProyectoScreen} />
      <Stack.Screen name="Sector" component={SectorScreen} />
      <Stack.Screen name="Vivienda" component={ViviendaScreen} />
      <Stack.Screen name="Fotos" component={FotosScreen} />
    </Stack.Navigator>
  );
}
