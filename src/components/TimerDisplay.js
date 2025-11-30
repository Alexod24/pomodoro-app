import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

export default function TimerDisplay({ minutes, seconds }) {
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <Text style={styles.timerText}>
      {formatTime(minutes)}:{formatTime(seconds)}
    </Text>
  );
}

const styles = StyleSheet.create({
  timerText: {
    fontSize: 90,
    fontFamily: 'Mansalva_400Regular',
    color: colors.text,
    marginBottom: 40,
  },
});
