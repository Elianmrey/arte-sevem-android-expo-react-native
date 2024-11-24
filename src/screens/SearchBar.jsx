import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { TextInput, StyleSheet, View, FlatList, Text } from 'react-native';
import { GetSearchResults } from '../services/SearchContent.module';
import Card from '../components/atomics/CardFilms';
import CardTV from '../components/atomics/CardTV';
import CheckBoxIcon from 'react-native-elements/dist/checkbox/CheckBoxIcon';

export default function SearchBar() {
    const [searchResult, setSearchResult] = useState([]);
    const [isChecked, setIsChecked] = useState([false,false,false]);
    const [searchType, setSearchType] = useState('');


    function onChek() {
        setIsChecked(!isChecked);
        setSearchType(isChecked[0] ? 'movie' : false);
        setSearchType(isChecked[1] ? 'tv' : false);
        setSearchType(isChecked[2] ? 'movie or tv' : false);
        SearchContent(searchResult);
    };

    const SearchContent = async (value) => {
        if (!value.trim()) {
            setSearchResult([]); // Limpa resultados se o input estiver vazio
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
        if (item.type === 'movie') {
            return <Card movie={item} addToFavorites={() => { }} />;
        }
        if (item.first_air_date) {
            return <CardTV tvProgram={item} addToFavorites={() => { }} />;
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
            <Text style={styles.title}>Buscar por:</Text>
           
           
            <View style={styles.checkboxContainer}>
            <CheckBoxIcon
                value={isChecked[0]} 
                onValueChange={() => { onChek }} // Atualiza o estado
            /> <Text style={styles.checkboxTitle}>Filmes</Text>
            </View>




            <View style={styles.searchContainer}>
                <Text style={styles.searchText}>Resultados</Text>
                <FlatList
                    data={searchResult}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}/>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 15,
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
        
    },
    checkboxTitle: {
        marginLeft: 5,
        fontSize: 16,
        color: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    searchContainer: {
        marginTop: 20,
        width: '100%',
        flex: 1,
    },
    searchText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});
