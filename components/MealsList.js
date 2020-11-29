import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from './MealItem';


const MealsList = props => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

    const renderMealItem = itemData => {
        const isFavoriteMeal = favoriteMeals.some(meal => meal.id === itemData.item.id);
        return (
            <MealItem
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: 'MealDetails', params: {
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: isFavoriteMeal
                        }
                    })
                }} />
        )
    }

    return (<View style={styles.list}>
        <FlatList style={{ width: '100%' }}
            data={props.dataList}
            keyExtractor={(item, index) => item.id}
            renderItem={renderMealItem} />

    </View>);
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }
});

export default MealsList;
