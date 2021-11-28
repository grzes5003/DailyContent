import * as React from "react";
import {
    View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Share, Alert,
} from "react-native";
import {SimpleLineIcons} from '@expo/vector-icons';
import {useAppSelector} from "../_helpers/store.hooks";
import {selectLoggedIn} from "../_reducers/auth.reducer";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {feedbackActions} from "../_actions/feedback.actions";
import {selectFeedbackStatus} from "../_reducers/info.reducer";
import {infoActions} from "../_actions/info.actions";

export const BUTTON_HEIGHT = 48;
export const BUTTON_WIDTH = 200;

const onShare = async ({title, description}: {title: string, description: string}) => {
    const n = 80;
    try {
        const result = await Share.share({
            message: (description.length > n) ? description.substr(0, n-1) + '...' : description,
            title: title,
        }, {
            tintColor: 'black'
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log("shared with type ", result.activityType)
            } else {
                console.log("shared")
            }
        } else if (result.action === Share.dismissedAction) {
            console.log("dismissed")
        }
    } catch (error) {
        alert(error.message);
    }
};

export default ({title, description, index}: {title: string, description: string, index: number}) => {
    const navigation = useNavigation();

    const feedbackStatus = useAppSelector((state) => selectFeedbackStatus(state, index))
    const loggedIn = useAppSelector(selectLoggedIn);

    const dispatch = useDispatch();

    const handleLoginAlert = () => {
        if (!loggedIn) {
            navigation.navigate('Login');
        }
    };

    const handleLike = () => {
        dispatch(feedbackActions.likeContent(index))
        dispatch(infoActions.changeFeedback(index, true))
    };

    const handleDislike = () => {
        dispatch(feedbackActions.dislikeContent(index))
        dispatch(infoActions.changeFeedback(index, true))
    };

    const iconColor = loggedIn && !feedbackStatus ? 'white' : 'grey';
    const bcgColor = loggedIn && !feedbackStatus ? 'rgb(93, 95, 222)' : 'rgb(81,81,87)';

    return (
    <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
        <TouchableOpacity disabled={feedbackStatus}
            onPress={() => loggedIn ? handleLike() : handleLoginAlert()}>
            <View style={[styles.likeButton, {backgroundColor: bcgColor }]}>
            <SimpleLineIcons name="like" size={24} style={{textAlign: "center"}} color={iconColor}/>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => loggedIn ? onShare({title, description}) : handleLoginAlert()}>
            <View style={[styles.button, {backgroundColor: bcgColor }]}>
                <Text style={[styles.label, {color: iconColor}]}>Share</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity disabled={feedbackStatus}
            onPress={() => loggedIn ? handleDislike() : handleLoginAlert()}>
            <View style={[styles.likeButton, {backgroundColor: bcgColor }]}>
                <SimpleLineIcons name="dislike" size={24} style={{textAlign: "center"}} color={iconColor}/>
            </View>
        </TouchableOpacity>
    </View>
)};

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
        backgroundColor: 'rgb(81,81,87)',
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