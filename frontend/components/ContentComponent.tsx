import * as React from "react";
import {View, StyleSheet, Dimensions, Platform} from "react-native";
import Animated from "react-native-reanimated";
import {Album, ContentInfo} from "./Model";
import Content from "./Content";
import Cover from "./Cover";
import {ParallaxImage} from "react-native-snap-carousel";
import ImageView from "react-native-image-viewing";
import {useState} from "react";
import {bool} from "yup";

interface ContentProps {
    content: ContentInfo;
    index: number;
    parallaxProps: any;
}

const { Value } = Animated;

export default ({ content, index, parallaxProps }: ContentProps) => {
    const y = new Value(0);
    const [visible, setIsVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Cover {...{ y, content, parallaxProps }} />
            <Content {...{ y, content, index, setIsVisible }} />
            <ImageView
                images={[{uri: content.uri}]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
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