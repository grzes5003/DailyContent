import * as React from 'react';
import {StyleSheet, Button, Alert} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Carousel from 'react-native-snap-carousel';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {useState} from 'react'

export default function TabOneScreen({navigation}: RootTabScreenProps<'TabOne'>) {

    const [state, setState] = useState({
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
            {
                title: "Item 5",
                text: "Text 5",
            },
        ]
    });

    let _renderItem = ({item, index}: { item: any, index: number }) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Today's selection</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <Carousel
                layout={"default"}
                // ref={ref => carousel = ref}
                data={state.carouselItems}
                sliderWidth={300}
                itemWidth={300}
                renderItem={_renderItem}
                onSnapToItem={index => setState({carouselItems: state.carouselItems, activeIndex: index})}/>
        </View>
    );
}

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
