import {Button, Modal, View} from "react-native";
import React, {useState} from "react";
import ImageView from "react-native-image-viewing";
import {ContentInfo} from "../components/Model";
import {useNavigation} from "@react-navigation/native";


export default (content: ContentInfo) => {
    const navigation = useNavigation();
    const [visible, setIsVisible] = useState(true);

    const handleBack = () => {
        navigation.goBack();
    }
    return(
    <Modal  visible={true} transparent={true}>
        <ImageView
            images={[{uri: "file:///var/mobile/Containers/Data/Application/1AD4D4A6-6711-46CA-A012-5F56D443A61E/Documents/ExponentExperienceData/%2540anonymous%252FDailyContent-8c5c02f2-abff-48c8-bca4-0c4a3bd00975/1.jpg"}]}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
        />
    </Modal>
)}