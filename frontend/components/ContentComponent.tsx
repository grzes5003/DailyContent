import * as React from "react";
import {View, StyleSheet, Dimensions, Platform} from "react-native";
import Animated from "react-native-reanimated";
import {Album, ContentInfo} from "./Model";
import Content from "./Content";
import Cover from "./Cover";
import {ParallaxImage} from "react-native-snap-carousel";

interface ContentProps {
    content: ContentInfo;
    parallaxProps: any;
}

const { Value } = Animated;

export default ({ content, parallaxProps }: ContentProps) => {
    const y = new Value(0);
    return (
        <View style={styles.container}>
            <Cover {...{ y, content, parallaxProps }} />
            <Content {...{ y, content }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: "black",
    }
});