import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator, Platform, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'; 
import { colors } from '../constants/colors';

// Importamos las fuentes
import { useFonts, Quicksand_700Bold, Quicksand_600SemiBold } from '@expo-google-fonts/quicksand';
import { Mansalva_400Regular } from '@expo-google-fonts/mansalva';

// RECIBIMOS LA PROPIEDAD { navigation } AQUÍ
export default function HomeScreen({ navigation }) {
  
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
      <View style={styles.header}>
        <Text style={styles.logoText}>CatFocus</Text>
        <TouchableOpacity style={styles.settingsButton}>
             <Feather name="hexagon" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* 2. CONTENIDO CENTRAL */}
      <View style={styles.contentContainer}>
        
        {/* Ilustración del Gato */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/cat.gif')}
            style={{ width: 250, height: 250}}
            resizeMode="contain"
          />
          {/* Sombra decorativa */}
          {/* <View style={styles.shadow} /> */}
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

      {/* 3. FOOTER (Santuario) */}
      <View style={styles.footer}>
          <TouchableOpacity style={styles.sanctuaryButton}>
            <Ionicons name="leaf-outline" size={20} color={colors.secondaryText || '#A0A0A0'} style={{marginRight: 5}} />
            <Text style={styles.sanctuaryText}>Santuario</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.taskButton}>
            <Ionicons name="clipboard-outline" size={20} color={colors.secondaryText || '#A0A0A0'} style={{marginRight: 5}} />
            <Text style={styles.taskText}>Tareas</Text>
          </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? 40 : 0, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  logoText: {
    fontSize: 24,
    fontFamily: 'Quicksand_700Bold',
    color: colors.text,
  },
  settingsButton: {
    padding: 5,
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
      paddingBottom: 30,
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