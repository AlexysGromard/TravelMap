import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ThemeProvider, { ThemeContext } from './context/ThemeContext';
import DataFetchingScreen from './screens/DataFetchingScreen';
import MapScreen from './screens/MapScreen';
import SettingsScreen from './screens/SettingsScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      {/* <MainComponent /> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="DataFetching" 
            component={DataFetchingScreen}
          />
          <Stack.Screen 
            name="Map" 
            component={MapScreen}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={ { title: 'Settings', presentation: 'modal' } }
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

// const MainComponent = () => {
//   const theme = useContext(ThemeContext);

//   return (
//     <View style={[styles.container, { backgroundColor: theme.background }]}>
//       <Text style={{ color: theme.text }}>Welcome to Travel Map!</Text>
//     </View>
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
