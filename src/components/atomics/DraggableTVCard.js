import { useRef } from "react";
import { StyleSheet, View, Animated, PanResponder, Text, Image, TouchableOpacity } from "react-native";
import StarsRating from "./StarsRating";
import { useFavorites } from "../../context/FavoritesContext"; 
import { useNavigation } from "@react-navigation/native";

const DraggableTVCard = ({ tvProgram }) => {
    const pan = useRef(new Animated.ValueXY()).current;
    
    const { addFavorite } = useFavorites();


    const navigation = useNavigation();

    const handlePress = () => {

        // Navega para a tela de detalhes
        navigation.navigate('TVDetails', { tvProgram });
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx > 150) {
                    // Adicionar aos favoritos ao arrastar para a direita
                    addFavorite(tvProgram);

                   
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }).start();
                } else {
                   
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.card, { transform: pan.getTranslateTransform() }]}
                {...panResponder.panHandlers}
            >
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${tvProgram.poster_path || tvProgram.backdrop_path}` }}
                    style={styles.image}
                />
                <Text style={styles.title}>{tvProgram.original_name || tvProgram.name || "Não Disponível"}</Text>
                <Text style={styles.subtitle}>{tvProgram.first_air_date || "Não Disponível"}</Text>
                <StarsRating rating={tvProgram.vote_average} />
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text style={styles.buttonText}>Mais Detalhes</Text>
                </TouchableOpacity>
            </Animated.View>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        margin: 5,
    },
  card: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        overflow: 'hidden',
        width: 185,
        height: 410,
        alignItems: 'center',
        margin: 5,
    },
    image: {
        width: '100%',
        height: 280,
    },
  
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    button: {
        width: "100%",
        padding: 5,
        backgroundColor: "#3498db",
        padding: 10,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        width: "100%",
        borderRadius: 5,
    },
    

});

export default DraggableTVCard;
