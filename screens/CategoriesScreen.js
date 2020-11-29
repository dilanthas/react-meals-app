import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CategoryGridTile from '../components/CategoryGridTile';
import Colors from '../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';



import { CATEGORIES } from '../data/dummy-data';


const CategoriesScreen = props => {
    const renderItem = (itemData) => {
        return (
            <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onSelect={() => {
                props.navigation.navigate({
                    routeName: 'CategoryMeals', params: {
                        categoryId: itemData.item.id
                    }
                })
            }} />
        );
    }

    return (
        <FlatList numColumns={2} data={CATEGORIES} renderItem={renderItem}
        />
    );
}

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Meal Categories",
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

const style = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150
    }
});

export default CategoriesScreen;