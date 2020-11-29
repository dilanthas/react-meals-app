import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals';


import Colors from '../constants/Colors';

const FilterSwitch = props => {
    return (
        <View style={styles.container}>
            <Text>{props.label}</Text>
            <Switch thumbColor={Colors.primaryColor} trackColor={{ true: Colors.primaryColor }} value={props.value} onValueChange={props.onChange} />
        </View>
    );
}
const FilterScreen = props => {

    const { navigation } = props;
    const [isGlutenFree, setGlutenFree] = useState(false);
    const [isLactoseFree, setLactoseFree] = useState(false);
    const [isVegan, setVegan] = useState(false);

    const [isVegitarian, setVegitarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegitarian
        }
        dispatch(setFilters(appliedFilters));
    }, [isGlutenFree, isLactoseFree, isVegitarian, isVegitarian, dispatch]);

    useEffect(() => {
        navigation.setParams({
            save: saveFilters
        })
    }, [saveFilters]);
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch label="Gluten Free" value={isGlutenFree} onChange={newValue => setGlutenFree(newValue)} />
            <FilterSwitch label="Lactose Free" value={isLactoseFree} onChange={newValue => setLactoseFree(newValue)} />

            <FilterSwitch label="Vegan " value={isVegan} onChange={newValue => setVegan(newValue)} />

            <FilterSwitch label="Vegitarian" value={isVegitarian} onChange={newValue => setVegitarian(newValue)} />

        </View>
    )
}



FilterScreen.navigationOptions = (navData) => {
    return {

        headerTitle: "Filter Meals",
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
        },
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Save"
                        iconName='ios-save'
                        onPress={navData.navigation.getParam('save')}
                    />
                </HeaderButtons>
            )
        }
    }
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        margin: 22,
        textAlign: "center"
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10
    }
});

export default FilterScreen;