import {View, Text, StyleSheet, Image, ScrollView,Dimensions,Platform, StatusBar,} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import StarsRating from '../components/atomics/StarsRating.js';

const { width } = Dimensions.get('window');

const Details = () => {
    const route = useRoute();
    const { tvProgram } = route.params; // Recebe os detalhes do filme.


    return (
        <LinearGradient
            colors={['#1F0428', 'indigo', '#030E1F']} style={styles.container}
        >
        <ScrollView style={styles.container}>
            <Image
                source={{
                    uri: `https://image.tmdb.org/t/p/w500${tvProgram.poster_path || tvProgram.backdrop_path }`,
                }}
                style={styles.poster}
            />
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{tvProgram.original_name || tvProgram.name || 'Não Disponível'}</Text>
                <Text style={styles.subtitle}>
                    Lançamento: {tvProgram.first_air_date}
                </Text>
                <Text style={styles.subtitle}> Avaliação: </Text>
                <Text> <StarsRating rating={tvProgram.vote_average} /> </Text>
                <Text style={styles.overviewTitle}>Sinopse:</Text>
                <Text style={styles.overview}>{tvProgram.overview || 'Não Disponível'}</Text>
                
            </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        ...Platform.select({
            android: {
                paddingTop: StatusBar.currentHeight,
            },
           default: { paddingTop: 15 },
        }),
        
    },
    poster: {
        width: width,
        height: 650,
    },
    detailsContainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ecf0f1',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#bdc3c7',
        marginBottom: 4,
    },
    overviewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ecf0f1',
        marginTop: 16,
        marginBottom: 8,
    },
    overview: {
        fontSize: 14,
        color: '#bdc3c7',
        lineHeight: 20,
    },
});

export default Details;
