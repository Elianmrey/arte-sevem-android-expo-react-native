import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StarsRating from './StarsRating';

const CardFilms = ({ movie }) => {
    const navigation = useNavigation(); 

    const handlePress = () => {
      
        navigation.navigate('FilmDetails', { movie });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.card}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}` }}
                    style={styles.image}
                />
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.subtitle}>{movie.release_date}</Text>
                                <Text><StarsRating rating={movie.vote_average} /></Text> 
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        overflow: 'hidden',
        width: 185,
        height: 430,
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 300,
    },
    title: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CardFilms;
