import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { LightThemeColors, DarkThemeColors } from '../styles/colors';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? DarkThemeColors : LightThemeColors);
    console.log('theme', Appearance.getColorScheme());

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
