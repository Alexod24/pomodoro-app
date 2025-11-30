import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function Dock({ onSettingsPress, onBackPress, isHome, onTasksPress, onMusicPress, onSanctuaryPress }) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handlePressIn = (tooltip) => {
    setActiveTooltip(tooltip);
  };

  const handlePressOut = () => {
    setActiveTooltip(null);
  };

  return (
    <View style={styles.dockContainer}>
      {/* Tooltip Bubble */}
      {activeTooltip && (
        <View style={styles.tooltipContainer}>
          <View style={styles.tooltipBubble}>
            <Text style={styles.tooltipText}>{activeTooltip}</Text>
            <View style={styles.tooltipArrow} />
          </View>
        </View>
      )}

      <View style={styles.dock}>
        {isHome ? (
          <TouchableOpacity 
            style={styles.iconButton}
            onPressIn={() => handlePressIn('Inicio')}
            onPressOut={handlePressOut}
            activeOpacity={0.7}
          >
               <Ionicons name="home-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onBackPress}
            onPressIn={() => handlePressIn('Atrás')}
            onPressOut={handlePressOut}
            activeOpacity={0.7}
          >
               <Ionicons name="arrow-back-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        
        <View style={styles.separator} />

        <TouchableOpacity 
            style={styles.iconButton} 
            onPress={onSettingsPress}
            onPressIn={() => handlePressIn('Configuración')}
            onPressOut={handlePressOut}
            activeOpacity={0.7}
        >
             <Ionicons name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.iconButton}
            onPress={onMusicPress}
            onPressIn={() => handlePressIn('Música')}
            onPressOut={handlePressOut}
            activeOpacity={0.7}
        >
             <Ionicons name="musical-notes-outline" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.iconButton}
            onPress={onTasksPress}
            onPressIn={() => handlePressIn('Tareas')}
            onPressOut={handlePressOut}
            activeOpacity={0.7}
        >
             <Ionicons name="clipboard-outline" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.iconButton}
            onPress={onSanctuaryPress}
            onPressIn={() => handlePressIn('Santuario')}
            onPressOut={handlePressOut}
            activeOpacity={0.7}
        >
             <Ionicons name="leaf-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dockContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 1000,
  },
  dock: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 5,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  tooltipContainer: {
    position: 'absolute',
    top: -50, // Position above the dock
    alignItems: 'center',
  },
  tooltipBubble: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Quicksand_600SemiBold',
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1A1A1A',
    alignSelf: 'center',
    marginTop: -1, // Overlap slightly to look connected
  },
});
