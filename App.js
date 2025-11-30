// App.js
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
// Si usas Contexto (para las monedas), envuélvelo aquí
import { GameProvider } from './src/context/GameContext'; 
import { SoundProvider } from './src/context/SoundContext';

export default function App() {
  return (
    <GameProvider>
      <SoundProvider>
         <AppNavigator />
      </SoundProvider>
    </GameProvider>
  );
}