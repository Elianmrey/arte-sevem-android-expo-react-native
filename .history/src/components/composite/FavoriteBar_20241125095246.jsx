import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useFavorites } from '../../context/FavoritesContext';
import CardFilms from '../atomics/CardFilms';
import CardTV from '../atomics/CardTV';

const FavoriteBar = () => {
    const { favorites, removeFavorite } = useFavorites();

    const [isClosed, setIsClosed] = useState(false);

    return (
        isClosed? <View style={styles.favoriteBar}>
            <View style={styles.closeIconContainer}>
                 <Ionicons name='close' size={24} color="red" onPress={() => setIsClosed(!isClosed)} style={{  textAlign: 'end' }} />
            </View>
                <Text style={styles.favoriteBarTitle}>Barra de Favoritos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.favoriteList}>
             
                {favorites.map((item) => (
                    item.media_type === 'movie' || item.data_release ?
                        (<TouchableOpacity key={item.id}>
                            <Ionicons name="remove-circle" size={24} color="red" onPress={() => removeFavorite(item.id)} />
                            <CardFilms movie={item} />
                            
                        </TouchableOpacity>) : (<View style={styles.closeIconContainer}>
                <Text style={styles.favoriteBarTitle}>Lista de Favoritos</Text>
                <Ionicons name='heart' size={24} color="red" onPress={() => setIsClosed(!isClosed)} style={{ textAlign: 'end' }} />
            </View>)))
                }
                 
                {favorites.map((item) => (
                    item.media_type === 'tv' || item.first_air_date ?
                        (<TouchableOpacity key={item.id}>
                            <Ionicons name="remove-circle" size={24} color="red" onPress={() => removeFavorite(item.id)} />
                            <CardTV tvProgram={item} />

                        </TouchableOpacity>) : (<View style={styles.closeIconContainer}>
                            <Text style={styles.favoriteBarTitle}>Lista de Favoritos</Text>
                            <Ionicons name='heart' size={24} color="red" onPress={() => setIsClosed(!isClosed)} style={{ textAlign: 'end' }} />)
                        </View>)))
                }
            </ScrollView>
        </View>
    )      
    
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
