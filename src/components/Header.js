import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>CatFocus</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10, 
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Quicksand_700Bold',
    color: colors.text,
  },
});
