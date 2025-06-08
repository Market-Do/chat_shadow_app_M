import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeScreen() {
  const { colors, theme, toggleTheme, setThemeScheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Appearance Settings</Text>
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => setThemeScheme('light')}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>Light Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => setThemeScheme('dark')}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>Dark Theme</Text>
      </TouchableOpacity>

       <TouchableOpacity 
        style={[styles.button, { backgroundColor: colors.card, borderColor: colors.border }]}
        onPress={() => setThemeScheme('system')}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>System Default</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 24,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  }
});