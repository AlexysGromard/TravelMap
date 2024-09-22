import React, { useContext } from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import ThemeProvider, { ThemeContext } from '../context/ThemeContext';

const getStartedButton = (navigation, theme) => {
    return (
        <TouchableOpacity
            style={[styles.getStartedButton, { backgroundColor: theme.primary }]}
            onPress={() => navigation.replace('DataFetching')}
        >
            <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
    );
}

const WelcomeScreen = ({ navigation }) => {
    const theme = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: theme.primary }]}>
            <View style={ styles.pictureContainer }>
                <Image
                    source={require('../assets/welcome-icon.png')}
                    accessibilityLabel="Travel Map Icon"
                />
            </View>
            <View style={[styles.textContainer, { backgroundColor: theme.background }]}>
                <Text style={[styles.title, { color: theme.text }]}>Welcome to Travel Map 🌍</Text>
                <Text style={[styles.description, { color: theme.text }]}>TravelMap scans your photos to pinpoint and color-code the places you've visited. View your travels on an interactive map and easily explore your memories!</Text>
                <Text style={[styles.description, { color: theme.text }]}>All your data is stored securely on your device. Nothing is shared with anyone, ever.</Text>
                { getStartedButton(navigation, theme) }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    pictureContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        width: '100%',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        height: 302,
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        gap: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Roboto',
    },
    description: {
        fontSize: 14,
        fontFamily: 'Roboto',
    },
    getStartedButton: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 28,
    },
    getStartedText: {
        color: '#F5F5F5',
        fontSize: 16,
        fontWeight: '500',
    }
});

export default WelcomeScreen;