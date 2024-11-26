import { useEffect, useState } from 'react';
import {  StyleSheet, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import FavoriteBar from '../components/composite/FavoriteBar.jsx';
import { getInfo } from '../services/TMDBService.js';
import DraggableTVCard from '../components/atomics/DraggableTVCard.jsx';

import AddFavoritesBar from '../components/atomics/AddFavoritesBar.js';

const TvPrograms = () => {
    
    const [tvPrograms, setTvPrograms] = useState([]);

    useEffect(() => {
        getInfo('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-BR&page=1&sort_by=popularity.desc')
            .then((response) => {
                setTvPrograms(response);
            }).catch((error) => {
                console.error(error);
            });
    }, []);


    
    return (
        <LinearGradient
            colors={['#1F0428', 'indigo', '#030E1F']} style={styles.container}
        >
            <AddFavoritesBar />

            <ScrollView  contentContainerStyle={styles.CardTVsContainer}>

                <Text style={styles.title}>Programas de TV Populares</Text>
                {tvPrograms.map((tvProgram) => (
                    <DraggableTVCard key={tvProgram.id} tvProgram={tvProgram}/>
                ))}
            </ScrollView>
            <FavoriteBar style={styles.favoriteBar}/>
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
        padding: 15,

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        marginTop: 25,
        textAlign: 'center',
    },
    CardTVsContainer: {
        justifyContent: 'space-evenly',
        marginBottom: 100,
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    favoriteBar: {
        marginBottom: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'orange',
    },
});

export default TvPrograms;
