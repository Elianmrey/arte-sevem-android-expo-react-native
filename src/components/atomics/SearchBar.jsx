import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

export default function SearchBar({ value, onChange }) {
    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradientContainer} >
       
            <TextInput
                style={styles.input}
                placeholder="Pesquisar filmes..."
                value={value}
                onChangeText={onChange}
            />
       
            </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        alignItems: 'start',
        justifyContent: 'flex-start',
        background: 'linear-gradient(45deg,indigo, #34495e)',
        padding: 15,
        flexWrap: 'wrap',
        width: '100%',

    },
   
    input: {
        
        width: '100%',
        height: 60,
        fontSize: 16,
        paddingLeft: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginTop: 40,

    },
});
