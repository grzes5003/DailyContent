import * as React from 'react';
import {
    StyleSheet,
    Button,
    Alert,
    Image,
    ActivityIndicator,
    ScrollView,
    RefreshControl,
    TouchableOpacity, Dimensions, Platform, ListRenderItem, Animated, NativeSyntheticEvent, NativeScrollEvent
} from 'react-native';

import {loremIpsum, LoremIpsum} from 'react-lorem-ipsum';
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

    const {width: screenWidth, height: screenHeight} = Dimensions.get('window')
    console.log('uri', imagesUri)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(imgActions.getAllImages());
    }, [dispatch]);

    const _carousel = useRef(null);
    const animatedZoom = useRef('80%').current;
    let carouselRef: Carousel<ParallaxImage> | null;
    let tapGestureRef: TapGestureHandler | null;
    let scrollRef: ScrollView | null;

    const [scrollPos, setScrollPos] = useState(0);
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

    const zoom = Math.min(screenWidth / 15, screenHeight / 15);

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        // @ts-ignore
        Animated.timing(animatedZoom, {
            toValue: -500,
            duration: 2000,
            useNativeDriver: false
        }).start();
    };

    const onReload = () => {
        dispatch(imgActions.getAllImages());
    }

    const _handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        console.log(screenWidth * 0.8 *(1 - (event.nativeEvent.contentOffset.y/screenHeight)) + screenWidth * 0.7,
            screenWidth*0.7);
        let val = Math.max(Math.min(screenWidth * 0.9, screenWidth *  (event.nativeEvent.contentOffset.y/screenHeight) + screenWidth * 0.7),
            screenWidth*0.7)
        setScrollPos(val);
    };

    const _renderItem = ({item, index}: { item: any, index: number }, parallaxProps: any) => {
        return (
            <View style={styles.slide}>
                <TouchableOpacity onPress={() => {
                    console.log('pressed');
                    // carouselRef?.snapToNext()
                    fadeIn()
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
                <Animated.View
                    style={[
                        {
                            // position: 'absolute',
                            top: '-10%',
                            // right: 0,
                            left: '10%',

                            // padding: 20,
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            borderRadius: 10,
                        },
                        {
                            // Bind opacity to animated value
                            width: scrollPos,
                        }
                    ]}
                >
                    {/*<View style={[{*/}
                    {/*    position: 'absolute',*/}
                    {/*    top: '70%',*/}
                    {/*    right: '10%',*/}
                    {/*    left: '10%',*/}

                    {/*    backgroundColor: 'rgba(0, 0, 0, 0.3)',*/}
                    {/*    borderRadius: 10,*/}
                    {/*}*/}
                    {/*]}>*/}
                        <Text style={styles.TitleText}>Titelasd </Text>
                        <Text style={styles.DescriptionText}>{loremIpsum({p: 5})}</Text>
                    {/*</View>*/}
                </Animated.View>

            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
            <Animated.ScrollView
                ref={(c: any) => {scrollRef = c}}
                style={styles.ScrollStyle}
                contentContainerStyle={{flexGrow: 1}}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onReload} // exl in function : this.yourWebview.reload();
                    />
                }
                onScroll={_handleScroll}
                scrollEventThrottle={16}
            >
                {/*<View style={styles.container}>*/}
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
                            // @ts-ignore
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
                {/*</View>*/}
            </Animated.ScrollView>
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
        // position: 'relative',
        // flex: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        width: 'auto',
        height: 'auto',
        // padding: 10,
        // marginLeft: 25,
        // marginRight: 25,
    },
    ScrollStyle: {
        backgroundColor: 'white',
        flex: 1,
        // position: 'relative',
    },
    imageContainer: {
        // flex: 1,
        // height: '50%',
        height: Dimensions.get('window').height * 0.7,
        marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    TextOnImg: {
        // position: 'absolute',
        top: '70%',
        right: '10%',
        left: '10%',

        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 10,
    },
    TitleText: {
        // position: 'relative',
        marginLeft: -20,
        marginTop: -40,
        fontSize: 70,
        color: 'rgb(255,252,252)'
    },
    DescriptionText: {
        // position: 'relative',
        padding: 20,
        fontSize: 20,
        color: 'rgb(255,252,252)'
    }
});
