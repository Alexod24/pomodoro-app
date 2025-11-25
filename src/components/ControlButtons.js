import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

export default function ControlButtons({ isActive, toggleTimer, resetTimer, minutes }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {isActive ? (
          <TouchableOpacity onPress={toggleTimer} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Pausar / Rendirse</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleTimer} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Iniciar</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {!isActive && (minutes !== 25 && minutes !== 5) && (
        <TouchableOpacity onPress={resetTimer} style={styles.resetLink}>
            <Text style={styles.resetLinkText}>Reiniciar contador</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.buttonPrimary,
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30, 
    width: '80%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  primaryButtonText: {
    color: colors.buttonText,
    fontSize: 18,
    fontFamily: 'Quicksand_700Bold',
  },
  secondaryButton: {
    backgroundColor: colors.buttonSecondary,
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 18,
    fontFamily: 'Quicksand_700Bold',
  },
  resetLink: {
    marginTop: 20,
    padding: 10,
  },
  resetLinkText: {
    color: colors.secondaryText,
    fontSize: 14,
    fontFamily: 'Quicksand_500Medium',
    textDecorationLine: 'underline',
  }
});
