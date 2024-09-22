import React, {useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import ThemeProvider, { ThemeContext } from '../context/ThemeContext';

const MapScreen = () => {
    const theme = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
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

export default MapScreen;