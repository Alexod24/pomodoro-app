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

export default function TasksScreen({ navigation }) {
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
        <Text style={styles.title}>Mis Tareas</Text>
      </View>

      {/* INPUT CONTAINER AT THE TOP */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputWrapper}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nueva tarea..."
            value={newTask}
            onChangeText={setNewTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />

      <Dock 
        isHome={false}
        onBackPress={() => navigation.goBack()}
        onSettingsPress={() => {}} // Placeholder if needed
        onTasksPress={() => {}} // Already here
        onMusicPress={() => navigation.navigate('Music')}
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
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Quicksand_700Bold',
    color: colors.text,
  },
  inputWrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
    zIndex: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
    color: colors.text,
    paddingVertical: 5,
  },
  addButton: {
    backgroundColor: colors.button || '#1A1A1A',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 25,
    paddingBottom: 100, // Space for dock
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  checkboxCompleted: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  taskText: {
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
    color: colors.text,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: colors.secondaryText,
  },
});
