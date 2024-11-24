import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StarsRating({ rating }) {
    const maxStars = 5; // Número máximo de estrelas
    const normalizedRating = (rating / 10) * maxStars; // Converte para escala de 0 a 5
    const filledStars = Math.floor(normalizedRating); // Estrelas cheias
    const emptyStars = maxStars - filledStars; // Estrelas vazias

    return (
        <View style={styles.container}>
            {/* Renderiza estrelas cheias */}
            {[...Array(filledStars)].map((_, i) => (
                <Text key={`filled-${i}`} style={styles.star}>★</Text>
            ))}
            {/* Renderiza estrelas vazias */}
            {[...Array(emptyStars)].map((_, i) => (
                <Text key={`empty-${i}`} style={styles.star}>☆</Text>
            ))}
            {/* Mostra a nota numérica */}
            <Text style={styles.text}>{rating.toFixed(1)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        fontSize: 20,
        color: '#f1c40f', // Cor das estrelas
    },
    text: {
        marginLeft: 5,
        fontSize: 16,
        color: '#2c3e50', // Cor do texto
    },
});
