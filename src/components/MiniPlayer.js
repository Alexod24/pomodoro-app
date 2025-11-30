import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useSound } from '../context/SoundContext';
import { useFonts, Quicksand_600SemiBold } from '@expo-google-fonts/quicksand';

const SOUND_NAMES = {
  '1': 'Lluvia',
  '2': 'Bosque',
  '3': 'Fuego',
  '4': 'Noche',
  '5': 'Olas',
  '6': 'Ruido Blanco',
};

export default function MiniPlayer() {
  const { selectedSoundId, isPlaying, togglePlayback } = useSound();

  let [fontsLoaded] = useFonts({
    Quicksand_600SemiBold,
  });

  if (!selectedSoundId || !fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={togglePlayback}
        activeOpacity={0.7}
      >
        <Ionicons 
            name={isPlaying ? "pause" : "play"} 
            size={20} 
            color={colors.text} 
        />
        <Text style={styles.text}>
            {SOUND_NAMES[selectedSoundId]}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, // Space below header
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  text: {
    marginLeft: 8,
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 14,
    color: colors.text,
  },
});
