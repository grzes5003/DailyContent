import * as React from "react";
import {
    StyleSheet, Text, View,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import {onScrollEvent} from "react-native-redash/src/v1/Gesture";

import {
    Album, ContentInfo, MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT,
} from "./Model";
import ShufflePlay, {BUTTON_HEIGHT} from "./ShufflePlay";
import Header from "./Header";
import {loremIpsum, fullname} from "react-lorem-ipsum";

interface ContentProps {
    content: ContentInfo;
    y: Animated.Value<number>;
}

const {
    interpolateNode, Extrapolate,
} = Animated;

export default ({content: {title, description}, y}: ContentProps) => {
    const track= 'asdsad'
    const key = 0

    const height = interpolateNode(y, {
        inputRange: [-MAX_HEADER_HEIGHT, -BUTTON_HEIGHT / 2],
        outputRange: [0, MAX_HEADER_HEIGHT + BUTTON_HEIGHT],
        extrapolate: Extrapolate.CLAMP,
    });
    const opacity = interpolateNode(y, {
        inputRange: [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2],
        outputRange: [0, 1, 0],
        extrapolate: Extrapolate.CLAMP,
    });
    return (
        <Animated.ScrollView
            onScroll={onScrollEvent({y})}
            style={styles.container}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            stickyHeaderIndices={[1]}
        >
            <View style={styles.cover}>
                <Animated.View
                    style={[styles.gradient, {height}]}
                >
                    <LinearGradient
                        style={StyleSheet.absoluteFill}
                        start={[0, 0.3]}
                        end={[0, 1]}
                        colors={["transparent", "rgba(0, 0, 0, 0.2)", "black"]}
                    />
                </Animated.View>
                <View style={styles.artistContainer}>
                    <Animated.Text style={[styles.artist, {opacity}]}>{title}</Animated.Text>
                </View>
            </View>
            <View style={styles.header}>
                <Header {...{y, title}} />
                <ShufflePlay/>
            </View>
            <View style={styles.tracks}>
                <Text style={{color: 'white', fontSize: 20, padding: 10}}>
                    {description}
                    {/*{loremIpsum({p: 7, startWithLoremIpsum: false, random: true})}*/}
                </Text>
                <View style={{height: 200}}/>
                {/*<Track*/}
                {/*    index={key + 1}*/}
                {/*    {...{track, key, artist}}*/}
                {/*/>*/}
            </View>
            {/*<View style={styles.tracks}>*/}
            {/*    {*/}
            {/*        tracks.map((track, key) => (*/}
            {/*            <Track*/}
            {/*                index={key + 1}*/}
            {/*                {...{ track, key, artist }}*/}
            {/*            />*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</View>*/}
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: MIN_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
    },
    cover: {
        height: MAX_HEADER_HEIGHT - BUTTON_HEIGHT,
    },
    gradient: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        alignItems: "center",
    },
    artistContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "flex-start",
        padding: 10,
        marginBottom: BUTTON_HEIGHT
    },
    artist: {
        textAlign: "center",
        color: "white",
        fontSize: 48,
        fontWeight: "bold",
    },
    header: {
        marginTop: -BUTTON_HEIGHT,
    },
    tracks: {
        paddingTop: 32,
        backgroundColor: "black",
    },
});