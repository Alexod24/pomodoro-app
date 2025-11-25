import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

export default function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconButton}>
           <Ionicons name="close-outline" size={28} color={colors.text} />
      </TouchableOpacity>
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
});
