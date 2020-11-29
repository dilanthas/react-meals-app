import React from 'react';
import { View, Text, StyleSheet, Button, Platform, TouchableOpacity, TouchableNativeFeedback, ImageBackground } from 'react-native';


const handleError = (e) => { console.log(e.nativeEvent.error); };

const MealItem = props => {
    return (


        <View style={style.mealItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <View style={{ ...style.mealRow, ...style.mealHeader }}>
                        <ImageBackground source={{ uri: props.image }} style={style.bgImage} onError={handleError} >
                            <Text style={style.title} numberOfLines={1}>{props.title}</Text>
                        </ImageBackground>
                    </View>
                    <View style={{ ...style.mealRow, ...style.mealDetail }}>
                        <Text>{props.duration}m</Text>
                        <Text>{props.complexity.toUpperCase()}</Text>
                        <Text>{props.affordability.toUpperCase()}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    mealItem: {
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden'
    },
    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '85%'
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    title: {
        fontSize: 20,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingVertical: 5,
        paddingHorizontal: 12
    }
});
export default MealItem;