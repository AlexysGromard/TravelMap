import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { LightThemeColors, DarkThemeColors } from '../styles/colors';

export const ThemeContext = createContext();

/**
 * ThemeProvider component
 * This component provides the theme to the application based on the device's color scheme
 * @param {Object} children - The children components
 * @returns {JSX.Element} 
 */
const ThemeProvider = ({ children }) => {
    // Initialize the theme based on the current color scheme (dark or light)
    const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? DarkThemeColors : LightThemeColors);

    useEffect(() => {
        // Add a listener for color scheme changes and update the theme accordingly
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            if (colorScheme === 'dark') {
                setTheme(DarkThemeColors);
            } else {
                setTheme(LightThemeColors);
            }
        });

        // Cleanup the listener when the component unmounts
        return () => subscription.remove();
    }, []);

    return (
        // Provide the theme value to all child components
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
