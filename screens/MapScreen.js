import React, { useContext, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import * as d3 from 'd3-geo';
import worldMapData from '../assets/custom.geo.json';
import { ThemeContext } from '../context/ThemeContext';

const MapScreen = () => {
    const theme = useContext(ThemeContext);

    const scale = useRef(1); // Initial scale is 1
    const [lastScale, setLastScale] = useState(1);

    const pathGenerator = d3.geoPath().projection(
        d3.geoMercator().scale(100).translate([150, 150])
    );

    // Configuration de l'événement de geste de pincement pour le zoom
    const onPinchEvent = event => {
        scale.current = lastScale * event.nativeEvent.scale;
        console.log(scale.current);
    };

    const onPinchStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            setLastScale(scale.current
            );
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <PinchGestureHandler onGestureEvent={onPinchEvent} onHandlerStateChange={onPinchStateChange}>
                <Svg 
                    height="100%" 
                    width="100%" 
                    viewBox={`0 0 300 300`} 
                    style={{ backgroundColor: theme.oceans, transform: [{ scale: scale.current }] }}
                >
                    {worldMapData.features.map((feature, index) => (
                        <Path
                            key={index}
                            d={pathGenerator(feature)}
                            fill={theme.background} // Couleur du pays
                            stroke={theme.text} // Couleur de la bordure
                            strokeWidth={0.1} // Épaisseur de la bordure
                        />
                    ))}
                </Svg>
            </PinchGestureHandler>
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
