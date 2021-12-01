import React, {useState, useEffect} from "react";
import {Asset} from "expo-asset";
import {ActivityIndicator, Animated, Dimensions, Platform, StatusBar, StyleSheet, TouchableOpacity} from "react-native";
// @ts-ignore
// import { AppLoading } from "expo";

import Album from "../components/ContentComponent";
import {Album as AlbumModel, ContentInfo} from "../components/Model";
import Carousel, {AdditionalParallaxProps, ParallaxImage} from "react-native-snap-carousel";
import {useAppSelector} from "../_helpers/store.hooks";
import {selectImagesUri, selectImgLoading} from "../_reducers/img.reducer";
import {Text, View} from "../components/Themed";
import {loremIpsum} from "react-lorem-ipsum";
import {useDispatch} from "react-redux";
import {imgActions} from "../_actions/img.actions";
import {infoActions} from "../_actions/info.actions";
import {selectContentText, selectInfoLoading} from "../_reducers/info.reducer";
import ContentComponent from "../components/ContentComponent";
import ImageViewer from "react-native-image-zoom-viewer";
import ImageView from "react-native-image-viewing";


export default () => {
    const imagesLoading = useAppSelector(selectImgLoading)
    const imagesUri = useAppSelector(selectImagesUri)

    const infoLoading = useAppSelector(selectInfoLoading)
    const contentTexts = useAppSelector(selectContentText)

    const {width: screenWidth, height: screenHeight} = Dimensions.get('window')
    let carouselRef: Carousel<ParallaxImage> | null;

    const [ready, setReady] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(imgActions.getAllImages());
        dispatch(infoActions.getAllContent());
    }, [dispatch]);

    const [contentList, setContentList] = useState({
        activeIndex: 0,
        carouselItems: imagesUri.map((image, idx) => (
                {
                    title: contentTexts[idx].title,
                    description: contentTexts[idx].description,
                    uri: image as unknown as string,
                    feedback: contentTexts[idx].feedback
                } as ContentInfo
            )
        )
    });


    console.log('content text ', contentTexts)
    // if (!ready) {
    //     return <AppLoading />;
    // }

    return (
        <View style={{flex: 1, height: 'auto', backgroundColor: 'black'}}>
            <StatusBar barStyle="light-content"/>

            {imagesLoading ?
                <ActivityIndicator size="large"/>
                :
                <Carousel
                    // layout={'stack'}
                    hasParallaxImages={true}
                    data={contentList.carouselItems}
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    slideStyle={{width: screenWidth, height: screenHeight, backgroundColor: 'black'}}
                    itemWidth={screenWidth}
                    itemHeight={screenHeight}
                    // @ts-ignore
                    renderItem={({item, index}: { item: any, index: number }, props: AdditionalParallaxProps) =>
                        _renderItem({item, index}, props)
                    }
                    onSnapToItem={index => setContentList({
                        carouselItems: contentList.carouselItems,
                        activeIndex: index
                    })}
                    // ref={(c) => {
                    //     carouselRef = c
                    // }}
                />
            }
        </View>

    );
};

const _renderItem = ({item, index}: { item: ContentInfo, index: number }, parallaxProps: AdditionalParallaxProps) => {
    const content = item as ContentInfo;
    return (
        <View style={{flex: 1, flexGrow: 1}}>
            <ContentComponent {...{content, index, parallaxProps}} />
        </View>
    );
}

// const styles = StyleSheet.create({
//     imageContainer: {
//         // flex: 1,
//         // height: '50%',
//         height: Dimensions.get('window').height * 0.7,
//         marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
//         backgroundColor: 'white',
//         borderRadius: 8,
//     },
//     image: {
//         ...StyleSheet.absoluteFillObject,
//         resizeMode: 'cover',
//     },
// });
