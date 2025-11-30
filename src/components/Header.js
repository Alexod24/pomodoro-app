import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function Header({ onSettingsPress, onBackPress }) {
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
             <Ionicons name="arrow-back-outline" size={28} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onSettingsPress}>
             <Ionicons name="settings-outline" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.headerTitle}>CatFocus</Text>
      
      <TouchableOpacity style={styles.iconButton}>
           <Ionicons name="musical-notes-outline" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10, 
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Quicksand_700Bold',
    color: colors.text,
  },
  iconButton: {
    padding: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
