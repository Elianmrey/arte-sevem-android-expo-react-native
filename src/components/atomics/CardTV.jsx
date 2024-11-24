import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StarsRating from './StarsRating';

const CardTv = ({ tvProgram }) => {
    const navigation = useNavigation(); // Obtém o objeto navigation

    const handlePress = () => {
        // Navega para a tela de detalhes
        navigation.navigate('Details', { tvProgram });
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.card}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${tvProgram.poster_path}` }}
                    style={styles.image}
                />
                <Text style={styles.title}>{tvProgram.title}</Text>/
                <Text style={styles.subtitle}>{tvProgram.release_date}</Text>
                <StarsRating rating={tvProgram.vote_average} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        overflow: 'hidden',
        width: 200,
        height: 400,
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

export default Card;
