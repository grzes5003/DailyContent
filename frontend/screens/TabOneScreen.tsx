import * as React from 'react';
import {
    StyleSheet,
    Button,
    Alert,
    Image,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
    TouchableOpacity, Dimensions, Platform
} from 'react-native';

import ImageView from "react-native-image-viewing";
import Carousel, {AdditionalParallaxProps, ParallaxImage} from 'react-native-snap-carousel';
import {Text, View} from '../components/Themed';
import {RootState, RootTabScreenProps} from '../types';
import {Component, createRef, useEffect, useRef, useState} from 'react'
import {userActions} from "../_actions/user.actions";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {imgActions} from "../_actions/img.actions";
import {useAppSelector} from "../_helpers/store.hooks";
import {selectLoggedIn} from "../_reducers/auth.reducer";
import {selectImagesUri, selectImgLoading} from "../_reducers/img.reducer";
import {State, TapGestureHandler} from "react-native-gesture-handler";


const TabOneScreen = ({navigation}: RootTabScreenProps<'TabOne'>) => {
    const loggedIn = useAppSelector(selectLoggedIn)
    const imagesUri = useAppSelector(selectImagesUri)
    const imagesLoading = useAppSelector(selectImgLoading)

    const {width: screenWidth, height: viewportHeight} = Dimensions.get('window')
    console.log('uri', imagesUri)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(imgActions.getAllImages());
    }, [dispatch]);

    const _carousel = useRef(null);
    let carouselRef: Carousel<ParallaxImage> | null;
    let tapGestureRef: TapGestureHandler | null;

    const [visible, setIsVisible] = useState(true);
    const [images, setImages] = useState({
        activeIndex: 0,
        carouselItems: imagesUri.map((image, idx) => (
                {
                    title: `Item ${idx}`,
                    text: `Text ${idx}`,
                    uri: image as unknown as string
                }
            )
        )
    });

    const onReload = () => {
        dispatch(imgActions.getAllImages());
    }

    const _handleStateChange = ({nativeEvent}: { nativeEvent: any }) => {
        if (nativeEvent.state === State.ACTIVE) {
            Alert.alert('Longpress');
        }
    };

    let _renderItem = ({item, index}: { item: any, index: number }, parallaxProps: any) => {
        return (
            <View style={styles.slide}>
                <TouchableOpacity onPress={() => {
                    console.log('pressed');
                    carouselRef?.snapToNext()
                    console.log(tapGestureRef?.propTypes)
                }}>
                    <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
                <ParallaxImage
                    source={{uri: item.uri as unknown as string}}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
            <ScrollView
                style={styles.ScrollStyle}
                contentContainerStyle={{flex: 1}}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onReload} // exl in function : this.yourWebview.reload();
                    />
                }>
{/*                <TapGestureHandler
                    onHandlerStateChange={(event) => {
                        if (event.nativeEvent.state === State.ACTIVE) {
                            console.log('pressed'); // Tap/Press action
                        }
                    }}
                    ref={(c) => {tapGestureRef = c}}
                >*/}
                    <View style={styles.container}>
                        {loggedIn ? <Text>logged in</Text> : <Text>not logged in</Text>}
                        {imagesLoading ?
                            <ActivityIndicator size="large"/>
                            :
                            <Carousel
                                // layout={'stack'}
                                hasParallaxImages={true}
                                data={images.carouselItems}
                                sliderWidth={screenWidth}
                                sliderHeight={screenWidth}
                                // slideStyle={{ width: screenWidth }}
                                itemWidth={screenWidth - 5}
                                renderItem={({
                                                 item,
                                                 index
                                             }: { item: any, index: number }, props: AdditionalParallaxProps) =>
                                    _renderItem({item, index}, props)}
                                onSnapToItem={index => setImages({
                                    carouselItems: images.carouselItems,
                                    activeIndex: index
                                })}
                                ref={(c) => {
                                    carouselRef = c
                                }}
                            />
                        }
                    </View>
                {/*</TapGestureHandler>*/}
            </ScrollView>
        </View>
    );
}


export default TabOneScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    slide: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: 'auto',
        height: '95%',
        // padding: 10,
        // marginLeft: 25,
        // marginRight: 25,
    },
    ScrollStyle: {
        backgroundColor: 'white',
        position: 'relative',
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});
