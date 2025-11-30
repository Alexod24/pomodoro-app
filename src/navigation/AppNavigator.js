// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import PomodoroScreen from '../screens/PomodoroScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          // --- AQUÍ ESTÁ LA CLAVE ---
          headerShown: false, // <--- ¡SIN COMILLAS! (Color azul/amarillo en el editor)
          animation: 'slide_from_right' // Este sí lleva comillas porque es texto
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pomodoro" component={PomodoroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}