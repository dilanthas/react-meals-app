import React from 'react';
import { View, Text, StyleSheet, Button, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';


const CategoryGridTile = props => {

    let TouchableComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }
    return (
        <View style={style.gridItem}>
            <TouchableComponent style={{ flex: 1 }} onPress={props.onSelect}>
                <View style={{ ...style.container, ...{ backgroundColor: props.color } }}>
                    <Text style={style.title} numberOfLines={2}>{props.title}</Text>
                </View>
            </TouchableComponent>
        </View>

    )
}

const style = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        overflow: 'hidden'
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 20,
        textAlign: 'right'
    }
});

export default CategoryGridTile;