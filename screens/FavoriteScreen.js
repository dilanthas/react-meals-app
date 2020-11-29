import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import MealsList from '../components/MealsList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';



const FavoriteScreen = props => {
    const favMeal = useSelector(state => state.meals.favoriteMeals);

    if (favMeal.length === 0) {
        return (
            <View style={styles.content}>
                <Text>No favorite items added</Text>
            </View>
        )

    } else {
        return (
            <MealsList dataList={favMeal} navigation={props.navigation} />
        )
    }

}

FavoriteScreen.navigationOptions = (navData) => {
    return {

        headerTitle: "Your Favorites",
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ''

        },
        headerTintColor: 'white',
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Favorite"
                        iconName='ios-menu'
                        onPress={() => {
                            navData.navigation.toggleDrawer();
                        }}
                    />
                </HeaderButtons>
            )
        }

    }
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavoriteScreen;