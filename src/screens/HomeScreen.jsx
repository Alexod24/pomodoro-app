import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator, Platform, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'; 
import { colors } from '../constants/colors';

import Header from '../components/Header';
import SettingsModal from '../components/SettingsModal';
import Dock from '../components/Dock';
import usePomodoroTimer from '../hooks/usePomodoroTimer';

// Importamos las fuentes
import { useFonts, Quicksand_700Bold, Quicksand_600SemiBold } from '@expo-google-fonts/quicksand';
import { Mansalva_400Regular } from '@expo-google-fonts/mansalva';

// RECIBIMOS LA PROPIEDAD { navigation } AQUÍ
export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  
  // Usamos el hook para manejar la configuración (nota: el estado es local por ahora)
  const {
    focusDuration,
    breakDuration,
    updateDurations
  } = usePomodoroTimer();
  
  let [fontsLoaded] = useFonts({
    Quicksand_700Bold,
    Quicksand_600SemiBold,
    Mansalva_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={colors.text} style={{flex:1}}/>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* 1. HEADER */}
      <Header />
      
      <SettingsModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        onSave={updateDurations}
      />

      {/* 2. CONTENIDO CENTRAL */}
      <View style={styles.contentContainer}>
        
        {/* Ilustración del Gato */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/cat.gif')}
            style={{ width: 250, height: 250}}
            resizeMode="contain"
          />
        </View>

        {/* BOTÓN START CON NAVEGACIÓN */}
        <TouchableOpacity 
            style={styles.startButton} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Pomodoro')} // <--- ESTO CAMBIA DE PANTALLA
        >
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>

      </View>

      <Dock 
        isHome={true}
        onSettingsPress={() => setModalVisible(true)}
        onTasksPress={() => navigation.navigate('Tasks')}
        onMusicPress={() => navigation.navigate('Music')}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? 40 : 0, 
  },
  contentContainer: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50, 
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60, 
  },
  shadow: {
    height: 15,
    width: 140,
    backgroundColor: '#E0E0E0',
    borderRadius: 50,
    opacity: 0.5,
    marginTop: -15,
    transform: [{ scaleY: 0.5 }], 
  },
  startButton: {
    backgroundColor: colors.button || '#1A1A1A',
    paddingVertical: 18,
    paddingHorizontal: 80,
    borderRadius: 50, 
    elevation: 5, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  startButtonText: {
    color: colors.buttonText || '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Mansalva_400Regular',
  },
  footer: {
      paddingHorizontal: 25,
      paddingBottom: 100, // Increased padding to make space for Dock
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center', 
  },
  sanctuaryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5', 
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
  },

  taskButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5', 
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
  },

  sanctuaryText: {
      color: colors.secondaryText || '#A0A0A0',
      fontFamily: 'Mansalva_400Regular',
      fontSize: 14,
  },
  taskText: {
      color: colors.secondaryText || '#A0A0A0',
      fontFamily: 'Mansalva_400Regular',
      fontSize: 14,
  }

});