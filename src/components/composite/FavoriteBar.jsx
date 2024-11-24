import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useFavorites } from '../../context/FavoritesContext';
import CardFilms from '../atomics/CardFilms';
import CardTV from '../atomics/CardTV';

const FavoriteBar = () => {
    const { favorites, removeFavorite } = useFavorites();

    const [isClosed, setIsClosed] = useState(false);
    const [isTV, setIsTV] = useState([]);
    const [isMovie, setIsMovie] = useState([]);

    useEffect(() => {
        setIsMovie(favorites.filter((item) => item.date_release || item.title || item.original_title));
        setIsTV (favorites.filter((item) => item.first_air_date && item.name && item.original_name));
    }, [favorites]);

    return (
        isClosed? <View style={styles.favoriteBar}>
            <View style={styles.closeIconContainer}>
                 <Ionicons name='close' size={24} color="red" onPress={() => setIsClosed(!isClosed)} style={{  textAlign: 'end' }} />
            </View>
                <Text style={styles.favoriteBarTitle}>Barra de Favoritos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.favoriteList}>
             
                {isMovie.map((movie, index) => (
                    movie.date_release || movie.title || movie.original_title ?
                        <TouchableOpacity key={index}>
                                <Ionicons name="remove-circle" size={24} color="red" onPress={() => removeFavorite(movie.id)} />
                                <CardFilms  movie={movie} />
                        </TouchableOpacity>: null))  }
                       
                {isTV.map((tvProgram, index) => (
                    tvProgram.first_air_date && tvProgram.name ?
                        <TouchableOpacity key={index}>
                            <Ionicons name="remove-circle" size={24} color="red" onPress={() => removeFavorite(tvProgram.id)} />
                            <CardTV  tvProgram={tvProgram}   />
                </TouchableOpacity> : null))
            }
            </ScrollView>
        </View> : <View style={styles.closeIconContainer}>
                <Text style={styles.favoriteBarTitle}>Lista de Favoritos</Text>
                <Ionicons name='heart' size={24} color="red" onPress={() => setIsClosed(!isClosed)} style={{ textAlign: 'end' }} />
              
            </View>
           
    );
};

const styles = StyleSheet.create({
    closeIconContainer: {
        justifyContent: 'flex-end',
        width: '100%',
        height: '5%',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,   
        transition:'all 0 0.5s ease',
    },
    favoriteBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        
        backgroundColor: '#34495e',
        paddingVertical: 10,
        paddingHorizontal: 10,
        zIndex: 100,
    },
    favoriteBarTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    favoriteTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    favoriteList: {
        flexDirection: 'row',
    },
    favoriteItem: {
        marginRight: 10,
    },
    favoriteImage: {
        width: 50,
        height: 75,
        borderRadius: 5,
    },
    favoriteItem: {
       transform: 'scale(0.2)',
    },
});

export default FavoriteBar;
