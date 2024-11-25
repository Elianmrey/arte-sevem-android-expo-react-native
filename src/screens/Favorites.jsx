import React from 'react';
import {  View, StyleSheet, ScrollView, Text } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import CardTV from '../components/atomics/CardTV';
import CardFilms from '../components/atomics/CardFilms';
import { LinearGradient } from 'expo-linear-gradient';

const Favorites = () => {
    const { favorites } = useFavorites();

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}
        >
        <Text style={styles.title}>Favoritos</Text>
        <ScrollView contentContainerStyle={styles.favCardcontainer}>
            {favorites.map((item) => (
                item.media_type === 'movie' ? <CardFilms key={item.id} movie={item} />
                    :
                    <CardTV key={item.id} tvProgram={item} />
            ))}
            </ScrollView>
        </LinearGradient >
         
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
       
    },
    favCardcontainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        marginTop: 20,
    },
    title: { color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 50, marginBottom: 15, fontSize: 25 },

});

export default Favorites;
