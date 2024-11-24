import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StarsRating from '../atomics/StarsRating';
import ButtonAvaliator from '../atomics/ButtonAvaliator';

export default function AvalFormulary({ onSubmit, rating }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Avalie o Filme:</Text>
            <StarsRating rating={rating} />
            <ButtonAvaliator onPress={onSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 10, backgroundColor: '#ecf0f1', borderRadius: 5 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});
