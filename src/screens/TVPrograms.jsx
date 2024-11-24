import  { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import CardTV from '../components/atomics/CardTV';
import FavoriteBar from '../components/composite/FavoriteBar';
import { getInfo } from '../services/TMDBService';
import { LinearGradient } from 'expo-linear-gradient';

const TvPrograms = () => {
    const [favorites, setFavorites] = useState([]);
    const [tvPrograms, setTvPrograms] = useState([]);

    useEffect(() => {
        getInfo('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc')
            .then((response) => {
                setTvPrograms(response);
            }).catch((error) => {
                console.error(error);
            });
    }, []);

    console.log(tvPrograms);



    // Adicionar o filme à lista de favoritos
    const addToFavorites = (movie) => {
        if (!favorites.find((fav) => fav.id === movie.id)) {
            setFavorites((prev) => [...prev, movie]);
        }
    };

    // Renderizar o CardTV
    const renderItem = ({ item }) => (
        <CardTV movie={item} addToFavorites={addToFavorites} />
    );

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}
        >
            <View >

                <Text style={styles.title}>Programas de TV Populares</Text>
                <FlatList
                    data={tvPrograms}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.CardTVsContainer}
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
    CardTVsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 100,

    },
});

export default TvPrograms;
