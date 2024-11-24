import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native';
import { GetSearchResults } from '../../services/SearchContent.module';
import { Text } from 'react-native';

export default function SearchBar() {

    const [searchResult, setSearchResult] = useState('');

    const SearchContent = (event) => { //Concertar Logica!
        const value = event;
        setSearchResult(GetSearchResults(value));
    };

    const renderItem = ({ item }) => (
        <Card movie={item} addToFavorites={addToFavorites} /> ||
        <CardTV tvProgram={item} addToFavorites={addToFavorites} />
    );
    console.log(searchResult);
    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradientContainer} >
       
            <TextInput
                style={styles.input}
                placeholder="Pesquisar filmes..."
                value={searchResult}
                onChangeText={SearchContent}
            />
            
            <View style={styles.searchContainer}>
                <Text style={styles.searchText}>Search</Text>
               
                <FlatList
                    data={searchResult}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </View>
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
