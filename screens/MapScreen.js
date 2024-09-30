import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import * as d3 from 'd3-geo';
import worldMapData from '../assets/custom.geo.json';
import { ThemeContext } from '../context/ThemeContext';

const MapScreen = () => {
    const theme = useContext(ThemeContext);
    const [translateX, setTranslateX] = useState(0); // Position horizontale
    const [translateY, setTranslateY] = useState(0); // Position verticale (si besoin de Y)

    const limits = {
        minX: -190,
        maxX: 190,
        minY: 20,
        maxY: 20,
    };

    const pathGenerator = d3.geoPath().projection(
        d3.geoMercator().scale(100).translate([150, 150])
    );

    const onGestureEvent = (event) => {
        const { translationX, translationY } = event.nativeEvent;

        // Update position with translation into limits
        setTranslateX(prevX => Math.max(limits.minX, Math.min(limits.maxX, prevX + translationX)));
        setTranslateY(prevY => Math.max(limits.minY, Math.min(limits.maxY, prevY + translationY)));
    };

    return (
        <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.END) {
                    // Optionnel : Réinitialiser ou fixer la position après le geste
                }
            }}
        >
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <Svg 
                    width="200%"  // Double la largeur du SVG pour permettre un défilement plus large
                    height="200%" // Idem pour la hauteur si nécessaire
                    viewBox="-200 0 700 300"
                    style={{
                        backgroundColor: theme.oceans,
                        transform: [{ translateX: translateX }, { translateY: translateY }], // Appliquer la translation
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
            </View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden', // Éviter le découpage du SVG en dehors de la vue
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MapScreen;
