import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useKeepAwake } from 'expo-keep-awake';
import { colors } from '../constants/colors';

import usePomodoroTimer from '../hooks/usePomodoroTimer';

// Components
import Header from '../components/Header';
import StatusIndicator from '../components/StatusIndicator';
import TaskInput from '../components/TaskInput';
import TimerDisplay from '../components/TimerDisplay';
import ControlButtons from '../components/ControlButtons';
import SettingsModal from '../components/SettingsModal';
import Dock from '../components/Dock';
import MiniPlayer from '../components/MiniPlayer';

// Fonts
import { 
  useFonts, 
  Quicksand_400Regular, 
  Quicksand_500Medium, 
  Quicksand_700Bold 
} from '@expo-google-fonts/quicksand';
import { Mansalva_400Regular } from '@expo-google-fonts/mansalva';

export default function PomodoroScreen({ navigation }) {
  useKeepAwake();
  const [modalVisible, setModalVisible] = useState(false);

  // Cargar fuentes
  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_700Bold,
    Mansalva_400Regular,
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
    switchMode,
    focusDuration,
    breakDuration,
    updateDurations
  } = usePomodoroTimer();

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={colors.text} style={{flex:1}}/>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <Header />
      <MiniPlayer />

      <View style={styles.contentContainer}>
        
        {/* Ilustración del Gato */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={require('../../assets/cat.gif')}
            style={{ width: 250, height: 250}}
            resizeMode="contain"
          />
        </View>

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

        <SettingsModal 
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          focusDuration={focusDuration}
          breakDuration={breakDuration}
          onSave={updateDurations}
        />
        
      </View>

      <Dock 
        isHome={false}
        onSettingsPress={() => setModalVisible(true)}
        onBackPress={() => navigation.goBack()}
        onTasksPress={() => navigation.navigate('Tasks')}
        onMusicPress={() => navigation.navigate('Music')}
        onSantuarioPress={() => navigation.navigate('Santuario')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 30,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, 
  },
});