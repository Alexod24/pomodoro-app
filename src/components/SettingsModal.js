import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsModal({ visible, onClose, focusDuration, breakDuration, onSave }) {
  const [focusTime, setFocusTime] = useState(focusDuration.toString());
  const [breakTime, setBreakTime] = useState(breakDuration.toString());

  useEffect(() => {
    setFocusTime(focusDuration.toString());
    setBreakTime(breakDuration.toString());
  }, [focusDuration, breakDuration, visible]);

  const handleSave = () => {
    const focus = parseInt(focusTime) || 25;
    const breakVal = parseInt(breakTime) || 5;
    onSave(focus, breakVal);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Configuración</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tiempo de Enfoque (min)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={focusTime}
              onChangeText={setFocusTime}
              maxLength={3}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tiempo de Descanso (min)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={breakTime}
              onChangeText={setBreakTime}
              maxLength={3}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Mansalva_400Regular',
    color: colors.text,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Quicksand_600SemiBold',
    color: colors.text,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    fontFamily: 'Quicksand_500Medium',
    color: colors.text,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: colors.buttonPrimary || '#FF6B6B',
    borderRadius: 25,
    padding: 15,
    elevation: 2,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontFamily: 'Mansalva_400Regular',
    fontSize: 18,
  },
});
