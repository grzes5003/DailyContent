import * as React from "react";
import {
    View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity,
} from "react-native";
import {SimpleLineIcons} from '@expo/vector-icons';

export const BUTTON_HEIGHT = 48;
export const BUTTON_WIDTH = 200;

export default () => (
    <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
        <TouchableOpacity>
            <View style={styles.likeButton}>
            <SimpleLineIcons name="like" size={24} style={{textAlign: "center"}} color="white"/>
            </View>
        </TouchableOpacity>

        <TouchableOpacity>
            <View style={styles.button}>
                <Text style={styles.label}>Share</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity>
            <View style={styles.likeButton}>
                <SimpleLineIcons name="dislike" size={24} style={{textAlign: "center"}} color="white"/>
            </View>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        backgroundColor: 'rgb(93, 95, 222)',
        height: BUTTON_HEIGHT,
        width: BUTTON_WIDTH,
        borderRadius: 32,
        justifyContent: "center",
    },

    likeButton: {
        alignSelf: "center",
        backgroundColor: 'rgb(93, 95, 222)',
        height: BUTTON_HEIGHT,
        width: BUTTON_HEIGHT,
        borderRadius: 32,
        justifyContent: "center",
    },

    label: {
        color: "white",
        fontSize: 14,
        textAlign: "center",
        fontWeight: "600",
    },
});