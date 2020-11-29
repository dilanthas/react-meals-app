import React, { useCallback, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';

import CustomHeaderButton from '../components/HeaderButton';

const ListItem = props => {
    return (
        <View style={styles.listItem} >
            <Text >{props.children}</Text>
        </View>
    );
}
const MealDetailScreen = props => {

    const mealId = props.navigation.getParam('mealId');
    const availableMeals = useSelector(state => state.meals.meals);

    const isFavoriteMeal = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    const meal = availableMeals.find(meal => meal.id === mealId);

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
    }, [toggleFavoriteHandler])

    useEffect(() => {
        props.navigation.setParams({ isFav: isFavoriteMeal });
    }, [isFavoriteMeal])
    return (
        <ScrollView>
            <Image source={{ uri: meal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <Text>{meal.duration}m</Text>
                <Text>{meal.complexity.toUpperCase()}</Text>
                <Text>{meal.affordability.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {meal.ingredients.map(ingredient => (<ListItem key={ingredient}>{ingredient}</ListItem>))}
            <Text style={styles.title}> Steps</Text>
            {meal.steps.map(step => (<ListItem key={step}>{step}</ListItem>))}
            <Text>Steps</Text>

        </ScrollView>

    )
}

MealDetailScreen.navigationOptions = (navigationData) => {
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFav = navigationData.navigation.getParam('toggleFav');
    const isFav = navigationData.navigation.getParam('isFav');
    return {
        headerTitle: mealTitle,
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Favorite"
                        iconName={isFav ? 'ios-star' : 'ios-star-outline'}
                        onPress={toggleFav}
                    />
                </HeaderButtons>
            );
        }
    }
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 20,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});
export default MealDetailScreen;