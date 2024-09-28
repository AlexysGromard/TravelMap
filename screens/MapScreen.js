import React, { useContext, useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';
import ThemeProvider, { ThemeContext } from '../context/ThemeContext';
import Svg, { Path, G } from 'react-native-svg';
import * as d3 from 'd3-geo';
import worldMapData from '../assets/custom.geo.json';

const MapScreen = () => {
    const theme = useContext(ThemeContext);

    const pathGenerator = d3.geoPath().projection(
        d3.geoMercator().fitSize([300, 300], worldMapData)
    );
  
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Svg height="100%" width="100%" viewBox="0 0 300 300" style={{ backgroundColor: theme.oceans }}>
                {worldMapData.features.map((feature, index) => (
                    <Path
                        key={index}
                        d={pathGenerator(feature)}
                        fill={theme.background} // Country color
                        stroke={theme.text} // Border color
                        strokeWidth={0.1} // Border width
                    />
                ))}
            </Svg>
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
