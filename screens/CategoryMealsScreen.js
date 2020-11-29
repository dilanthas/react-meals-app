import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Colors';
import MealsList from '../components/MealsList';
import { useSelector } from 'react-redux';


const CategoryMealsScreen = props => {

    const catId = props.navigation.getParam('categoryId');

    const availablMeals = useSelector(state => state.meals.filteredMeals);

    const meals = availablMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0)

    if (meals.length === 0) {
        return (
            <View style={styles.content}>
                <Text>No Meals available</Text>
            </View>
        )
    } else {
        return (
            <MealsList dataList={meals} navigation={props.navigation} />
        )
    }

}

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(cat => cat.id == catId);
    return {
        headerTitle: selectedCategory.title,
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ''

        },
        headerTintColor: 'white'
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }
});

export default CategoryMealsScreen;