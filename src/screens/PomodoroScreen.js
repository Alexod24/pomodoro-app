import React from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView,
  ActivityIndicator 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useKeepAwake } from 'expo-keep-awake';
import { colors } from '../constants/colors';

// Hooks
import usePomodoroTimer from '../hooks/usePomodoroTimer';

// Components
import Header from '../components/Header';
import StatusIndicator from '../components/StatusIndicator';
import TaskInput from '../components/TaskInput';
import TimerDisplay from '../components/TimerDisplay';
import ControlButtons from '../components/ControlButtons';

// Fonts
import { 
  useFonts, 
  Quicksand_400Regular, 
  Quicksand_500Medium, 
  Quicksand_700Bold 
} from '@expo-google-fonts/quicksand';

export default function PomodoroScreen() {
  useKeepAwake();

  // Cargar fuentes
  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_700Bold,
  });

  // Usar el hook personalizado
  const {
    minutes,
    seconds,
    isActive,
    mode,
    task,
    setTask,
    toggleTimer,
    resetTimer,
    switchMode
  } = usePomodoroTimer();

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={colors.text} style={{flex:1}}/>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <Header />

      <View style={styles.contentContainer}>
        
        <StatusIndicator mode={mode} isActive={isActive} />

        <TaskInput 
            task={task} 
            setTask={setTask} 
            isActive={isActive} 
        />

        <TimerDisplay minutes={minutes} seconds={seconds} />

        <ControlButtons 
            isActive={isActive} 
            toggleTimer={toggleTimer} 
            resetTimer={resetTimer} 
            minutes={minutes}
        />
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});