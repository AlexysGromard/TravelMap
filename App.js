import React, { useContext } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ThemeProvider, { ThemeContext } from './context/ThemeContext';
import { useColorScheme } from 'react-native';
import DataFetchingScreen from './screens/DataFetchingScreen';
import MapScreen from './screens/MapScreen';
import SettingsScreen from './screens/SettingsScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const CustomHeader = (theme) => (
  <View style={styles.headerContainer}>
      <Image 
          source={require('./assets/header-logo.png')}
          style={styles.logo}
      />
      <Text style={[styles.title, { color: theme.text }]}>Travel Map</Text>
  </View>
);

const Stack = createStackNavigator();

/**
 * Main component of the application
 */
export default function App() {
  // Use the useColorScheme hook to get the current system theme ('dark' or 'light')
  const colorScheme = useColorScheme();

  return (
    // Provide the theme to all components via the ThemeProvider
    <ThemeProvider>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          {/* Welcome screen, no header */}
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ headerShown: false }}
          />
          {/* Data fetching screen, no header */}
          <Stack.Screen 
            name="DataFetching" 
            component={DataFetchingScreen}
            options={{ headerShown: false }}
          />
          {/* Map screen, with a custom header */}
          <Stack.Screen 
            name="Map" 
            component={MapScreen}
            options={({ navigation }) => {
              return {
                headerTitle: () => <CustomHeader {...useContext(ThemeContext)} />,
                headerTitleAlign: 'left',
                headerStyle: {
                  elevation: 0,
                  height: 110,
                },
                headerRight: () => (
                  <TouchableOpacity 
                      onPress={() => navigation.navigate('Settings')}
                      style={styles.settingsButton}
                  >
                      <Ionicons name="settings-outline" size={24} color={useContext(ThemeContext).text} />
                  </TouchableOpacity>
                ),
              };
            }}
          />
          {/* Settings screen, displayed as a modal */}
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

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
      width: 37,
      height: 42,
      marginRight: 6,
      transform: [{ translateY: -5 }],
  },
  title: {
      fontSize: 20,
      fontWeight: '500',
  },
  settingsButton: {
    paddingHorizontal: 20,
  },
});
