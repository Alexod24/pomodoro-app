import React, { createContext, useState, useEffect, useContext } from 'react';
import { Audio } from 'expo-av';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

const SOUND_URLS = {
  '1': 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg', // Lluvia
  '2': 'https://actions.google.com/sounds/v1/ambiences/forest_morning.ogg', // Bosque
  '3': 'https://actions.google.com/sounds/v1/ambiences/fire.ogg', // Fuego
  '4': 'https://actions.google.com/sounds/v1/nature/crickets_at_night.ogg', // Noche
  '5': 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg', // Olas
  '6': 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg', // Ruido Blanco
};

export const SoundProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [selectedSoundId, setSelectedSoundId] = useState(null); // El sonido elegido
  const [isPlaying, setIsPlaying] = useState(false); // Si está sonando (preview o loop)
  const [isLooping, setIsLooping] = useState(false); // Si está en modo loop (MiniPlayer)

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });
  }, []);

  // Limpiar sonido al desmontar (opcional, pero buena práctica si el contexto muere)
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const loadAndPlay = async (id, loop = false) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const url = SOUND_URLS[id];
      if (!url) return;

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true, isLooping: loop }
      );

      setSound(newSound);
      setIsPlaying(true);
      setIsLooping(loop);

      // Si es preview (no loop), detener a los 5 segundos
      if (!loop) {
        newSound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
        
        setTimeout(async () => {
            // Solo detener si sigue siendo el mismo sonido y no se ha cambiado a loop
            // Esta lógica es simple; para producción robusta se necesitaría refinar
            // para evitar race conditions. Por ahora, asumimos flujo simple.
             try {
                 // Verificamos si aún estamos reproduciendo ESTE sonido en modo NO loop
                 // (Nota: esto es difícil de chequear perfectamente sin refs, pero el setTimeout
                 //  es para el "Preview").
                 // Simplemente detenemos si han pasado 5s y no es loop.
                 if (!loop) { 
                     await newSound.stopAsync();
                     setIsPlaying(false);
                 }
             } catch (e) {
                 // Ignorar error si ya se descargó
             }
        }, 5000);
      }

    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  // Función para la Pantalla de Música (Preview)
  const previewSound = async (id) => {
    // Si tocamos el mismo que ya está seleccionado, solo lo seleccionamos de nuevo y hacemos preview
    setSelectedSoundId(id);
    await loadAndPlay(id, false); // False = No loop (5s preview)
  };

  // Función para el MiniPlayer (Toggle Play/Pause)
  const togglePlayback = async () => {
    if (!selectedSoundId) return;

    if (isPlaying) {
      // Si está sonando, pausamos
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } else {
      // Si no está sonando...
      if (sound) {
        // Si ya hay un objeto sonido cargado (ej. pausado), reanudamos
        // Pero aseguramos que esté en loop si venimos de un preview
        // A veces es más fácil recargar para asegurar el estado de loop
        await loadAndPlay(selectedSoundId, true); 
      } else {
        // Cargar de cero
        await loadAndPlay(selectedSoundId, true);
      }
    }
  };

  return (
    <SoundContext.Provider value={{ 
        selectedSoundId, 
        isPlaying, 
        previewSound, 
        togglePlayback 
    }}>
      {children}
    </SoundContext.Provider>
  );
};
