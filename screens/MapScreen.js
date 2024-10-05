import React, { useContext, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import * as d3 from 'd3-geo';
import worldMapData from '../assets/custom.geo.json';
import { ThemeContext } from '../context/ThemeContext';

const MapScreen = () => {
    const theme = useContext(ThemeContext);
    const translateX = useRef(new Animated.Value(0)).current; // Position horizontale
    const translateY = useRef(new Animated.Value(0)).current; // Position verticale
    const scale = useRef(new Animated.Value(1)).current; // État pour le zoom
    const [lastScale, setLastScale] = useState(1); // Dernier zoom avant le geste
    const [lastOffsetX, setLastOffsetX] = useState(0); // Dernière position horizontale avant le geste
    const [lastOffsetY, setLastOffsetY] = useState(0); // Dernière position verticale avant le geste

    const limits = {
        minX: -190,
        maxX: 190,
        minY: 20,
        maxY: 20,
    };

    const pathGenerator = d3.geoPath().projection(
        d3.geoMercator().scale(100).translate([150, 150])
    );

    const onPanGestureEvent = (event) => {
        const { translationX, translationY } = event.nativeEvent;

        // Update position based on translation
        const newTranslateX = Math.max(limits.minX, Math.min(limits.maxX, lastOffsetX + translationX));
        const newTranslateY = Math.max(limits.minY, Math.min(limits.maxY, lastOffsetY + translationY));

        // Update the refs directly
        translateX.setValue(newTranslateX);
        translateY.setValue(newTranslateY);
    };

    const onPinchGestureEvent = Animated.event(
        [{ nativeEvent: { scale: scale } }],
        { useNativeDriver: false } // Utiliser false pour un meilleur contrôle
    );

    return (
        <PinchGestureHandler 
            onGestureEvent={onPinchGestureEvent}
            onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.END) {
                    // Mettre à jour le dernier zoom
                    setLastScale(lastScale * nativeEvent.scale);
                    // Réinitialiser l'échelle à 1 pour le prochain geste
                    scale.setValue(1); 
                }
            }}
        >
            <Animated.View style={{ flex: 1 }}>
                <PanGestureHandler
                    onGestureEvent={onPanGestureEvent}
                    onHandlerStateChange={({ nativeEvent }) => {
                        // Update the original position at the end of the gesture
                        if (nativeEvent.state === State.END) {
                            setLastOffsetX(lastOffsetX + nativeEvent.translationX);
                            setLastOffsetY(lastOffsetY + nativeEvent.translationY);
                        }
                    }}
                >
                    <Animated.View 
                        style={[styles.container, { 
                                backgroundColor: theme.background,
                                transform: [
                                    { translateX: translateX }, 
                                    { translateY: translateY },
                                    { scale: scale.interpolate({
                                        inputRange: [0.5, 2],
                                        outputRange: [lastScale * 0.5, lastScale * 2], // Appliquer le dernier zoom
                                        extrapolate: 'clamp'
                                    }) }
                                ],
                            }
                        ]}>
                        <Svg 
                            width="200%"  // Double la largeur du SVG pour permettre un défilement plus large
                            height="200%" // Idem pour la hauteur si nécessaire
                            viewBox="-200 0 700 300"
                            style={{
                                backgroundColor: theme.oceans,
                                overflow: 'visible' // Permet d'afficher le contenu en dehors de la vue
                            }}
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
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        </PinchGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'visible', // Éviter le découpage du SVG en dehors de la vue
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MapScreen;
