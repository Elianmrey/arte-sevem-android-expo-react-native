import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import CardFilms from '../components/atomics/CardFilms';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
    const { favorites, removeFavorite } = useFavorites();

    const renderItem = ({ item }) => (
        <CardFilms
            movie={item}
            onPress={() => removeFavorite(item.id)} 
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    list: {
        padding: 10,
    },
});

export default Favorites;
