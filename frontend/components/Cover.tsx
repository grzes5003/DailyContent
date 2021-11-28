import * as React from "react";
import {Platform, StyleSheet} from "react-native";
import Animated from "react-native-reanimated";
import {MAX_HEADER_HEIGHT, HEADER_DELTA, ContentInfo} from "./Model";
import { BUTTON_HEIGHT } from "./ShufflePlay";
import {ParallaxImage} from "react-native-snap-carousel";

interface CoverProps {
    content: ContentInfo;
    y: Animated.Value<number>;
    parallaxProps: any;
}

const { interpolateNode, Extrapolate } = Animated;

export default ({ content: { uri }, y, parallaxProps }: CoverProps) => {
    const scale: any = interpolateNode(y, {
        inputRange: [-MAX_HEADER_HEIGHT, 0],
        outputRange: [4, 1],
        extrapolateRight: Extrapolate.CLAMP,
    });
    const opacity = interpolateNode(y, {
        inputRange: [-64, 0, HEADER_DELTA],
        outputRange: [0, 0.2, 1],
        extrapolate: Extrapolate.CLAMP,
    });
    return (
        <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
            {/*<Image style={styles.image} source={cover} />*/}
            <ParallaxImage
                source={{uri: uri as unknown as string}}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}
                {...parallaxProps}
            />
            <Animated.View
                style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "black", opacity }}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: MAX_HEADER_HEIGHT + BUTTON_HEIGHT * 2,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
    },
    imageContainer: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined,
        marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    }
});