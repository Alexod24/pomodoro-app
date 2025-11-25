import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function StatusIndicator({ mode, isActive }) {
  return (
    <>
      <View style={styles.illustrationContainer}>
        <MaterialCommunityIcons 
          name={mode === 'BREAK' ? "sleep" : "cat"} 
          size={120} 
          color={colors.text} 
        />
        {isActive && mode === 'FOCUS' && (
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>Miau... (Concentrado)</Text>
            </View>
        )}
      </View>

      <Text style={styles.statusText}>
          {mode === 'FOCUS' 
              ? (isActive ? 'El gato está creciendo...' : 'Listo para enfocar') 
              : 'Hora de descansar'}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  illustrationContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  bubble: {
    position: 'absolute',
    top: -10,
    right: -40,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  bubbleText: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'Quicksand_500Medium',
  },
  statusText: {
    fontSize: 16,
    color: colors.secondaryText,
    marginBottom: 10,
    fontFamily: 'Quicksand_500Medium',
    letterSpacing: 0.5,
  },
});
