import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Card from '../components/atomics/CardFilms';
import FavoriteBar from '../components/composite/FavoriteBar';
import { getInfo } from '../services/TMDBService';
import { LinearGradient } from 'expo-linear-gradient';

const Filmes = () => {
    const [favorites, setFavorites] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getInfo('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc')
        .then((response) => {
                setMovies(response);
            }).catch((error) => {
                console.error(error);
            });
    }, []);

    // Adicionar o filme à lista de favoritos
    const addToFavorites = (movie) => {
        if (!favorites.find((fav) => fav.id === movie.id)) {
            setFavorites((prev) => [...prev, movie]);
        }
    };

    // Renderizar o card
    const renderItem = ({ item }) => (
        <Card movie={item} addToFavorites={addToFavorites} />
    );

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}
        >
            <View >

                <Text style={styles.title}>Filmes Populares</Text>
                <FlatList
                    data={movies}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.cardsContainer}
                />
                <Text style={styles.title}>Programas de TV Populares</Text>

                <FavoriteBar favorites={favorites} onRemove={(id) => setFavorites(favorites.filter((f) => f.id !== id))} />

            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'start',
        justifyContent: 'flex-start',
        background: 'linear-gradient(45deg,indigo, #34495e)',
        padding: 15,
        flexWrap: 'wrap',
        width: '100%',

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 100,

    },
});

export default Filmes;
