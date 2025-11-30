// App.js
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
// Si usas Contexto (para las monedas), envuélvelo aquí
import { GameProvider } from './src/context/GameContext'; 

export default function App() {
  return (
    <GameProvider>
       <AppNavigator />
    </GameProvider>
  );
}