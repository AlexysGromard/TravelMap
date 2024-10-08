import React, { useContext, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';
import * as d3 from 'd3-geo';
import worldMapData from '../assets/custom.geo.json';
import { ThemeContext } from '../context/ThemeContext';

const MapScreen = () => {
    const theme = useContext(ThemeContext);
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const [lastScale, setLastScale] = useState(1);
    const [lastOffsetX, setLastOffsetX] = useState(0);
    const [lastOffsetY, setLastOffsetY] = useState(0);

    // Calculer la projection et les chemins pour chaque pays
    const pathGenerator = d3.geoPath().projection(
        d3.geoMercator().scale(100).translate([150, 150])
    );

    const onPanGestureEvent = (event) => {
        const { translationX, translationY } = event.nativeEvent;
        
        // Ajuster les limites de déplacement en fonction du zoom
        const newTranslateX = Math.max(-400, Math.min(400, lastOffsetX + translationX));
        const newTranslateY = Math.max(-400, Math.min(400, lastOffsetY + translationY));

        translateX.setValue(newTranslateX);
        translateY.setValue(newTranslateY);
    };

    const onPinchGestureEvent = Animated.event(
        [{ nativeEvent: { scale: scale } }],
        { useNativeDriver: false }
    );

    return (
        <PinchGestureHandler
            onGestureEvent={onPinchGestureEvent}
            onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.END) {
                    setLastScale(lastScale * nativeEvent.scale);
                    scale.setValue(1); 
                }
            }}
        >
            <Animated.View style={{ flex: 1 }}>
                <PanGestureHandler
                    onGestureEvent={onPanGestureEvent}
                    onHandlerStateChange={({ nativeEvent }) => {
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
                                        outputRange: [lastScale * 0.5, lastScale * 2],
                                        extrapolate: 'clamp',
                                    }) }
                                ],
                            }
                        ]}>
                        <Svg 
                            width="200%" 
                            height="200%" 
                            viewBox="-200 0 700 300"
                            style={{
                                backgroundColor: theme.oceans,
                                overflow: 'visible'
                            }}
                        >
                            {worldMapData.features.map((feature, index) => (
                                <Path
                                    key={index}
                                    d={pathGenerator(feature)}
                                    fill={theme.land}
                                    stroke={theme.text}
                                    strokeWidth={0.1}
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
        overflow: 'visible',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MapScreen;
