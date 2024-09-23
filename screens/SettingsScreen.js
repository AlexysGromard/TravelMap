import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Linking } from 'react-native';
import ThemeProvider, { ThemeContext } from '../context/ThemeContext';

const GoToGitHub = () => {
    Linking.openURL('https://github.com/AlexysGromard/TravelMap');
};

const SettingsScreen = () => {
    const theme = useContext(ThemeContext);

    const [isEnabled, setIsEnabled] = React.useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: theme.text }]}>Settings</Text>

            {/* Notifications */}
            <View style={styles.option}>
                <Text style={[styles.optionText, { color: theme.text }]}>Notifications</Text>
                <Switch
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    AcccessibilityLabel="Toggle notifications"
                />
            </View>

          <TouchableOpacity style={styles.option} onPress={GoToGitHub}>
            <Text style={[styles.optionText, { color: theme.text }]}>Link to GitHub</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.option}>
            <Text style={[styles.optionText, { color: theme.error}]}>Delete all data</Text>
          </TouchableOpacity>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Roboto',
      },
      option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      optionText: {
        fontSize: 18,
      },
    });
    

export default SettingsScreen;