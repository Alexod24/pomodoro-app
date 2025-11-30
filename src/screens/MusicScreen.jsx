import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList, 
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { useSound } from '../context/SoundContext';

import Header from '../components/Header';
import Dock from '../components/Dock';

// Fonts
import { 
  useFonts, 
  Quicksand_400Regular, 
  Quicksand_600SemiBold,
  Quicksand_700Bold 
} from '@expo-google-fonts/quicksand';

const SOUNDS = [
  { id: '1', name: 'Lluvia', icon: 'weather-rainy', type: 'material' },
  // { id: '2', name: 'Bosque', icon: 'tree', type: 'material' },
  { id: '3', name: 'Fuego', icon: 'fire', type: 'material' },
  // { id: '4', name: 'Noche', icon: 'weather-night', type: 'material' },
  { id: '5', name: 'Olas', icon: 'waves', type: 'material' },
  // { id: '6', name: 'Ruido Blanco', icon: 'radio-tower', type: 'material' }, 
];

export default function MusicScreen({ navigation }) {
  const { selectedSoundId, previewSound } = useSound();

  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  const renderItem = ({ item }) => {
    const isSelected = selectedSoundId === item.id;
    
    return (
      <TouchableOpacity 
        style={[styles.card, isSelected && styles.cardSelected]} 
        onPress={() => previewSound(item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.iconContainer}>
            {item.type === 'material' ? (
                <MaterialCommunityIcons 
                    name={item.icon} 
                    size={32} 
                    color={isSelected ? '#FFFFFF' : colors.text} 
                />
            ) : (
                <Ionicons 
                    name={item.icon} 
                    size={32} 
                    color={isSelected ? '#FFFFFF' : colors.text} 
                />
            )}
        </View>
        <Text style={[styles.cardText, isSelected && styles.cardTextSelected]}>
            {item.name}
        </Text>
        
        {isSelected && (
            <View style={styles.checkIndicator}>
                <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
            </View>
        )}
      </TouchableOpacity>
    );
  };

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <Header />
      
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Música & Sonidos</Text>
        <Text style={styles.subtitle}>Toca para escuchar una vista previa (5s)</Text>
      </View>

      <FlatList
        data={SOUNDS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        style={styles.list}
      />

      <Dock 
        isHome={false}
        onBackPress={() => navigation.goBack()}
        onSettingsPress={() => {}} 
        onTasksPress={() => navigation.navigate('Tasks')}
        onMusicPress={() => {}} 
        onSantuarioPress={() => navigation.navigate('Santuario')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  headerContainer: {
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Quicksand_700Bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Quicksand_400Regular',
    color: colors.secondaryText,
    marginTop: 5,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 150, 
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    aspectRatio: 1,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardSelected: {
    backgroundColor: colors.text, 
    borderColor: colors.text,
  },
  iconContainer: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
    color: colors.text,
  },
  cardTextSelected: {
    color: '#FFFFFF',
  },
  checkIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
  }
});
