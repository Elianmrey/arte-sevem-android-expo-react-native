import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { TextInput, StyleSheet, View, FlatList, Text } from 'react-native';
import { GetSearchResults } from '../services/SearchContent';
import CardFilms from '../components/atomics/CardFilms';
import CardTV from '../components/atomics/CardTV';
import { RadioButton } from 'react-native-paper';
import { useFavorites } from '../context/FavoritesContext';

export default function SearchBar() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchType, setSearchType] = useState('movie or tv');
    const [_, setQuery] = useState('');
    const { addFavorite } = useFavorites();
    const SearchContent = async (value) => {
        if (!value.trim()) {
            setSearchResult([]);
            return;
        }

        try {
            const results = await GetSearchResults(value);
            setSearchResult(results);
        } catch (error) {
            console.error('Erro ao buscar resultados:', error);
        }
    };

    const renderItem = ({ item }) => {
        if (item.media_type === 'movie' && searchType === 'movie') {
            return <CardFilms movie={item} addToFavorites={() => { addFavorite(item) }} />;
        }
       else if (item.media_type === 'tv' && searchType === 'tv') {
            return <CardTV tvProgram={item} addToFavorites={() => { addFavorite(item) }} />;
        }
        else if (searchType === 'movie or tv') {
            if (item.media_type === 'movie') {
                return (
                    <CardFilms movie={item} addToFavorites={() => { addFavorite(item) }} />
                )
            } else if (item.media_type === 'tv') {
                return (
                    <CardTV tvProgram={item} addToFavorites={() => { addFavorite(item) }} />
                )
            };
        }
        return null;
    };
   
    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.gradientContainer}
        >
            <TextInput
                style={styles.input}
                placeholder="Pesquisar filmes ou programas de TV..."
                onChangeText={(value) => {
                    setQuery(value);
                    SearchContent(value);
                }}
            />
            <View style={styles.container}>
                <Text style={styles.filterTitle}>Buscar por:</Text>
                <RadioButton.Group
                    onValueChange={(newValue) => setSearchType(newValue)}
                    value={searchType} >
                    <View style={styles.checkboxRow}>
                        <RadioButton value="movie" />
                        <Text style={styles.checkboxText}>Filmes</Text>
                    </View>
                    <View style={styles.checkboxRow}>
                        <RadioButton value="tv" />
                        <Text style={styles.checkboxText}>Programas de TV</Text>
                    </View>
                    <View style={styles.checkboxRow}>
                        <RadioButton value="movie or tv" />
                        <Text style={styles.checkboxText}>Ambos</Text>
                    </View>
                </RadioButton.Group>
            </View>

            {searchResult.length > 0 ? (
                <View style={styles.searchEvolver}>
                    <Text style={styles.resultsTitle}>Resultados</Text>
                    <FlatList
                        data={searchResult}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.searchContainer}
                    />
                </View>
            ) : (
                <View style={styles.noResults}>
                    <Text style={styles.noResultsText}>
                        Vamos encontrar os melhores filmes e programas de TV!
                    </Text>
                </View>
            )}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
        width: '100%',
    },
    input: {
        width: '100%',
        height: 50,
        fontSize: 16,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        marginVertical: 20,
    },
    container: {
        width: '100%',
        marginBottom: 20,
    },
    filterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    checkboxText: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 10,
    },
    searchEvolver: {
        flex: 1,
        width: '100%',
        padding: 10,
    },
    resultsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    noResults: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
    },
    noResultsText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    searchContainer: {
        width: '100%',
        padding:0,
        
    },
});
