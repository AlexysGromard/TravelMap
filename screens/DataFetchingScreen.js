import React, { useContext }  from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ThemeProvider, { ThemeContext } from '../context/ThemeContext';

const DataFetchingScreen = () => {
    const theme = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: theme.primary }]}>
            <Image 
                source={require('../assets/camera-icon.png')}
                accessibilityLabel="Camera Icon"
                style={{ width: 126, height: 126 }}
            />
            <Image
                style={ styles.sandClockIcon }
                source={require('../assets/sand-clock-icon.png')}
                accessibilityLabel="Loading Icon"
            />
            <Text style={styles.description}>Loading and analyzing your photos...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 45,
    },
    sandClockIcon: {
        position: 'absolute',
        transform: [{ translateX: 50 }, { translateY: 10 }],
    },
    description: {
        color: '#F5F5F5',
        fontSize: 16,
        fontWeight: '500',
    },

});

export default DataFetchingScreen;