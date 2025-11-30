import { useState, useEffect } from 'react';
import { Vibration, Keyboard } from 'react-native';

export default function usePomodoroTimer() {
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('FOCUS');
  const [task, setTask] = useState('');

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            Vibration.vibrate([0, 500, 500, 500]);
            setIsActive(false);
            switchMode();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);

  const switchMode = () => {
    const nextMode = mode === 'FOCUS' ? 'BREAK' : 'FOCUS';
    const nextTime = nextMode === 'FOCUS' ? focusDuration : breakDuration;
    setMode(nextMode);
    setMinutes(nextTime);
    setSeconds(0);
    setIsActive(false);
  };

  const toggleTimer = () => {
    if (!isActive) Keyboard.dismiss();
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(mode === 'FOCUS' ? focusDuration : breakDuration);
    setSeconds(0);
  };

  const updateDurations = (newFocus, newBreak) => {
    setFocusDuration(newFocus);
    setBreakDuration(newBreak);
    
    // Si no está activo, actualizamos el tiempo actual inmediatamente para reflejar el cambio
    if (!isActive) {
      if (mode === 'FOCUS') {
        setMinutes(newFocus);
        setSeconds(0);
      } else {
        setMinutes(newBreak);
        setSeconds(0);
      }
    }
  };

  return {
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
  };
}
