import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

import Header from '../components/Header';
import Dock from '../components/Dock';

// Fonts
import { 
  useFonts, 
  Quicksand_400Regular, 
  Quicksand_600SemiBold,
  Quicksand_700Bold 
} from '@expo-google-fonts/quicksand';

export default function SantuarioScreen({ navigation }) {
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Comprar comida para gato', completed: false },
    { id: '2', text: 'Estudiar React Native', completed: true },
    { id: '3', text: 'Hacer ejercicio', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  const addTask = () => {
    if (newTask.trim().length === 0) return;
    
    const newTaskItem = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
    };
    
    setTasks([...tasks, newTaskItem]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.taskItem} 
      onPress={() => toggleTask(item.id)}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, item.completed && styles.checkboxCompleted]}>
        {item.completed && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
      </View>
      <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <Header />
      
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Proximamente ...</Text>
      </View>

     
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
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Quicksand_700Bold',
    color: colors.text,
  },
  
});
