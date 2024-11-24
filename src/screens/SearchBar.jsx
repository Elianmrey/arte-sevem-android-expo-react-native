import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { TextInput, StyleSheet, View, FlatList, Text } from 'react-native';
import { GetSearchResults } from '../services/SearchContent.module';
import Card from '../components/atomics/CardFilms';
import CardTV from '../components/atomics/CardTV';
import { ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default function SearchBar() {
    const [searchResult, setSearchResult] = useState([]);
    const [movieIsChecked, setMovieIsChecked] = useState(false);
    const [tvIsChecked, setTvIsChecked] = useState(false);
    const [bothChecked, setBothChecked] = useState(false);
    const [searchType, setSearchType] = useState('movie or tv');


    function onChek(value) {
        if (value === 0) setSearchType('movie');
        if (value === 1) setSearchType('tv');
        if (value === 2) setSearchType('movie or tv');
       
        SearchContent(searchResult);
    };

    const SearchContent = async (value) => {
        if (!value.trim()) {
            setSearchResult([]); 
            return;
        }

        try {
            const results = await GetSearchResults(value); // Aguarda os resultados
            setSearchResult(results); // Define os resultados no estado
        } catch (error) {
            console.error('Erro ao buscar resultados:', error);
        }
    };

    const renderItem = ({ item }) => {
        if (item.media_type === 'movie' && searchType === 'movie or tv') {
            return <Card movie={item} addToFavorites={() => { }} />;
        }
        if (item.media_type === 'tv' && searchType === 'movie or tv') {
            return <CardTV tvProgram={item} addToFavorites={() => { }} />;
        }
        if (searchType === 'movie') {
            if (item.media_type === 'movie') {
                  return <Card movie={item} addToFavorites={() => { }} />;
            }
         } 
        if (searchType === 'tv') {
            if (item.media_type === 'tv') {
                return <CardTV tvProgram={item} addToFavorites={() => { }} />;
            }
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
                placeholder="Pesquisar filmes..."
                onChangeText={SearchContent}
            />
            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    <Text style={styles.filterTitle}>Buscar por:</Text>
                </View>

                <View style={styles.checkboxContainer}>
                    
                    <View style={styles.checkboxRow}>
                        <CheckBox
                            title={'Filmes'}
                            onPress={() => { setMovieIsChecked(!movieIsChecked); onChek(0); }}
                            containerStyle={styles.checkbox}
                            checked={movieIsChecked}/>
                    </View>

                    <View style={styles.checkboxRow}>
                        <CheckBox
                            title={'Programas de TV'}
                            onValueChange={() => { setTvIsChecked(!tvIsChecked); onChek(1); }}
                            containerStyle={styles.checkbox}
                            checked={tvIsChecked}/>
                    </View>

                    <View style={styles.checkboxRow}>
                        <CheckBox
                            title={'Ambos'}
                            containerStyle={styles.checkbox}
                            value={bothChecked}
                            onValueChange={() => { setBothChecked(!bothChecked); onChek(3); }}
                            checked={bothChecked}/>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.listContainer}>
               
                {searchResult.length > 0 ?
                    <View style={styles.searchEvolver}>
                    <Text style={styles.resultsTitle}>Resultados</Text>
                    <FlatList
                    data={searchResult}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.searchContainer} /></View>
                    :
                    <View style={styles.noResults}>
                        <Text style={styles.noResultsText}>Vamos encontrar os melhores filmes e programas de TV!</Text>
                    </View>}
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 5,
        width: '100%',
    },

    listContainer: {
        flex: 1,
        width: '100%',
        padding: 8,
       
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
    container: {
        alignItems: 'center',
        width: '100%',
        
    },
    checkboxContainer: {
       flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        justifyContent: 'space-evenly',
        padding: 10,
    },

    checkboxRow: {
     flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'none',
      
    },

    checkboxTitle: {
       fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: -15,
    },
    searchEvolver: {
        width: '100%',
        flex: 1,
        padding: 5,
       },
    resultsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
        margin: 20,
    },
    noResults: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 10,
        width: '100%',
        marginBottom: 10,
        borderRadius: 10,

       
    },
    noResultsText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff', 
    },
    searchContainer: {
        width: '100%',
        flex: 1,
        padding: 5,
        flexDirection: 'row',
        gap: 15,
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
     
       
    },
    
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      
      },
    filterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
       
        color: '#fff',
        margin: 10,
    },
   
});
