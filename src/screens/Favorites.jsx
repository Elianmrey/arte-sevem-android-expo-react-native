import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useFavorites } from '../context/FavoritesContext.jsx';
import CardTV from '../components/atomics/CardTV.jsx';
import CardFilms from '../components/atomics/CardFilms.jsx';


const Favorites = () => {
    const { favorites } = useFavorites();

    return (
        <LinearGradient
            colors={['#1F0428', 'indigo', '#030E1F']} style={styles.container}
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
