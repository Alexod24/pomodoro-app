// src/context/GameContext.js
import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // Aquí guardaremos las monedas (latitas) y gatos desbloqueados
  const [coins, setCoins] = useState(0);

  const addCoins = (amount) => {
    setCoins(prev => prev + amount);
  };

  return (
    <GameContext.Provider value={{ coins, addCoins }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);