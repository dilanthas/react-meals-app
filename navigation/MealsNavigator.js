import React from 'react';
import { Text } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import FilterScreen from '../screens/FilterScreen';

import Colors from '../constants/Colors';
import { Platform } from 'react-native';


const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'A Screen'
};

const MealsNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen
        },
        CategoryMeals: {
            screen: CategoryMealsScreen
        },
        MealDetails: MealDetailScreen
    },
    {
        // initialRouteName: 'Categories',
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const FavoriteNavigator = createStackNavigator(
    {
        Favorites: FavoriteScreen,
        MealDetails: MealDetailScreen
    },
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
);

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text> Meals</Text> : "Meals"
        }
    },
    Favorites: {
        screen: FavoriteNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android' ? <Text > Favorites</Text> : "Favorites"

        }
    },
};

const MealsFavTabNavigator = Platform.OS === "android" ?
    createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true
    }) :

    createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            activeTintColor: Colors.accentColor
        }
    });

const FiltersNav = createStackNavigator(
    {
        Filters: FilterScreen
    },
    {
        defaultNavigationOptions: defaultStackNavOptions
    })
const MainNavigator = createDrawerNavigator(
    {
        MealsFavs: {
            screen: MealsFavTabNavigator, navigationOptions: {
                drawerLabel: "Meals"
            }
        },
        Filters: FiltersNav
    }, {
    contentOptions: {
        activeTintColor: Colors.accentColor
    }
}
);

export default createAppContainer(MainNavigator);
