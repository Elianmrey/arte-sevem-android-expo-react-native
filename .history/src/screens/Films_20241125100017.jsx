import { useEffect, useState } from 'react';
import {StyleSheet, Text, ScrollView } from 'react-native';
import { getInfo } from '../services/TMDBService';
import { LinearGradient } from 'expo-linear-gradient';
import DraggableFilmCard from '../components/atomics/DraggableFilmCard';
import FavoriteBar from '../components/composite/FavoriteBar';


const Films = () => {
    
    const [movies, setMovies] = useState([]);
    

    useEffect(() => {
        getInfo('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc')
        .then((response) => {
                setMovies(response);
            }).catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}
        >
            <Text style={styles.title}>Filmes Populares</Text>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {movies.map((movie) => (
                    <DraggableFilmCard key={movie.id} movie={movie}/>
                ))}
            </ScrollView>
            
            <FavoriteBar style={styles.favoriteBar}  />
        
        </LinearGradient>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'start',
        justifyContent: 'flex-start',
        background: 'linear-gradient(45deg,indigo, #34495e)',
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        marginTop: 25,
        textAlign: 'center',
    },
    cardsContainer: {
        
        marginBottom: 100,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default Films;
