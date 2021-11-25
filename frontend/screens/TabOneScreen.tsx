import * as React from 'react';
import {StyleSheet, Button, Alert, Image} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Carousel from 'react-native-snap-carousel';
import {Text, View} from '../components/Themed';
import {RootState, RootTabScreenProps} from '../types';
import {useEffect, useState} from 'react'
import {userActions} from "../_actions/user.actions";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {imgActions} from "../_actions/img.actions";
import {useAppSelector} from "../_helpers/store.hooks";
import {selectLoggedIn} from "../_reducers/auth.reducer";
import {selectImgUri} from "../_reducers/img.reducer";

// const mapState = (state: RootState) => ({
// // @ts-ignore
//     image: state.images.images
// })
//
// const mapDispatch = {
//     getImg: (idx: number) => (imgActions.getImg(idx))
// }


// const connector = connect(mapState, mapDispatch)
// type PropsFromRedux = ConnectedProps<typeof connector>
// type Props = PropsFromRedux;

// export default function
const TabOneScreen = ({navigation}: RootTabScreenProps<'TabOne'>) => {
    const loggedIn = useAppSelector(selectLoggedIn)
    const imageUri = useAppSelector(selectImgUri)
    console.log('uri', imageUri)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(imgActions.getAllImages());
    }, [dispatch]);

    const [images, setImages] = useState({
        activeIndex: 0,
        carouselItems: [
            {
                title: "Item 1",
                text: "Text 1",
            },
            {
                title: "Item 2",
                text: "Text 2",
            },
            {
                title: "Item 3",
                text: "Text 3",
            },
            {
                title: "Item 4",
                text: "Text 4",
            },
        ]
    });

    let _renderItem = ({item, index}: { item: any, index: number }) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
                <Image
                    style={{
                        height: 400,
                        width: '100%',
                        // display: 'block',
                    }}
                    source={{ uri: imageUri as unknown as string }}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {loggedIn ? <Text>logged in</Text> : <Text>not logged in</Text> }
            <Text style={styles.title}>Today's selection</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <Carousel
                layout={"default"}
                // ref={ref => carousel = ref}
                data={images.carouselItems}
                sliderWidth={400}
                itemWidth={400}
                renderItem={_renderItem}
                onSnapToItem={index => setImages({carouselItems: images.carouselItems, activeIndex: index})}/>
        </View>
    );
}

// export default connector(TabOneScreen)
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
        backgroundColor: 'floralwhite',
        borderRadius: 5,
        width: 'auto',
        height: '95%',
        padding: 10,
        marginLeft: 25,
        marginRight: 25,
    }

});
