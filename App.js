import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ThemeProvider, { ThemeContext } from './context/ThemeContext'; // Assure-toi d'importer le contexte

export default function App() {
  return (
    <ThemeProvider>
      <MainComponent />
    </ThemeProvider>
  );
}

const MainComponent = () => {
  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text }}>Welcome to Travel Map!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
