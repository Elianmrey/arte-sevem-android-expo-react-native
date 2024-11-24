import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NavBar() {
    const navigation = useNavigation();

    return (
        <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.navItem}>
                <Text style={styles.navText}>Início</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={styles.navItem}>
                <Text style={styles.navText}>Favoritos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.navItem}>
                <Text style={styles.navText}>Buscar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#34495e',
    },
    navItem: {
        padding: 10,
    },
    navText: {
        color: '#ecf0f1',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
