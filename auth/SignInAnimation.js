import {Animated, ImageBackground} from "react-native";
import React, {useEffect, useRef} from "react";

export const Box = ({ scale = 1 }) => (
    <Animated.View
        style={[
            {
                width: 100,
                height: 100,
                borderRadius: 100,
                transform: [{ scale }],
            },
        ]}>
        <ImageBackground source={require('../images/key.png')}
                         resizeMode='cover' style={{width: 100, height: 100}}>
        </ImageBackground>
    </Animated.View>
);

export const usePulse = (startDelay = 500) => {
    const scale = useRef(new Animated.Value(1)).current;

    const pulse = () => {
        Animated.sequence([
            Animated.timing(scale, { toValue: 1.2 }),
            Animated.timing(scale, { toValue: 0.8 }),
        ]).start(() => pulse());
    };

    useEffect(() => {
        const timeout = setTimeout(() => pulse(), startDelay);
        return () => clearTimeout(timeout);
    }, []);

    return scale;
};
