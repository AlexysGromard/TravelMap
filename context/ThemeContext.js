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
    const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? DarkThemeColors : LightThemeColors);

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            if (colorScheme === 'dark') {
                setTheme(DarkThemeColors);
            } else {
                setTheme(LightThemeColors);
            }
        });

        return () => subscription.remove();
    }, []);

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
