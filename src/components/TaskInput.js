import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

export default function TaskInput({ task, setTask, isActive }) {
  return (
    <TextInput
        style={styles.textInput}
        placeholder="¿Qué haremos hoy, humano?"
        placeholderTextColor={colors.secondaryText}
        value={task}
        onChangeText={setTask}
        editable={!isActive}
        maxLength={30}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 20,
    paddingVertical: 8,
    minWidth: 200,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent', 
    fontFamily: 'Quicksand_500Medium',
  },
});
