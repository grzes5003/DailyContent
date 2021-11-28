import * as React from "react";
import {
    RefreshControl,
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
import {imgActions} from "../_actions/img.actions";
import {useDispatch} from "react-redux";
import {infoActions} from "../_actions/info.actions";

interface ContentProps {
    content: ContentInfo;
    y: Animated.Value<number>;
    index: number;
}

const {
    interpolateNode, Extrapolate,
} = Animated;

export default ({content: {title, description, feedback}, y, index}: ContentProps) => {

    const dispatch = useDispatch();
    const onReload = () => {
        dispatch(imgActions.getAllImages());
        dispatch(infoActions.getAllContent());
    }

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
            refreshControl={
                <RefreshControl
                    tintColor='white'
                    refreshing={false}
                    onRefresh={onReload} // exl in function : this.yourWebview.reload();
                />
            }
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
                    <Animated.Text style={[styles.title, {opacity}]}>{title}</Animated.Text>
                </View>
            </View>
            <View style={styles.header}>
                <Header {...{y, title}} />
                <ShufflePlay title={title} index={index} description={description}/>
            </View>
            <View style={styles.description}>
                <Text style={{color: 'white', fontSize: 20, padding: 10}}>
                    {description}
                </Text>
                <View style={{height: 200}}/>
            </View>
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
    title: {
        textAlign: "center",
        color: "white",
        fontSize: 48,
        fontWeight: "bold",
    },
    header: {
        marginTop: -BUTTON_HEIGHT,
    },
    description: {
        paddingTop: 32,
        backgroundColor: "black",
    },
});