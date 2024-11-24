import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native-web';

const FavoriteBar = ({ favorites, onRemove }) => {
    return (
        <View style={styles.favoriteBar}>
            <Text style={styles.favoriteBarTitle}>Favoritos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.favoriteList}>
                {favorites.map((movie) => (
                    <View key={movie.id} style={styles.favoriteItem}>
                        <TouchableOpacity onPress={() => onRemove(movie.id)}>
                            <Ionicons name="remove-circle" size={24} color="red" />
                        </TouchableOpacity>
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                            style={styles.favoriteImage}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default FavoriteBar;
