import  { useState, useRef } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const AddFavoritesBar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const translateX = useRef(new Animated.Value(-35)).current; // Estado inicial da posição

    // Gerenciamento do gesto (movimento)
    const handleGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: false }
    );

    // Estado do gesto (início, fim ou cancelamento)
    const handleStateChange = (event) => {
        if (event.nativeEvent.state === State.END) {
            const translationX = event.nativeEvent.translationX;

            // Condição para definir hover e ajustar posição
            if (translationX > -15 && translationX < 0) {
                setIsHovered(true);
                Animated.timing(translateX, {
                    toValue: 0, // Posição final (componente visível)
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            } else {
                setIsHovered(false);
                Animated.timing(translateX, {
                    toValue: -35, // Retorna à posição original
                    duration: 300,
                    useNativeDriver: false,
                }).start();
            }
        }
    };

    return (
      
            <PanGestureHandler
                onGestureEvent={handleGestureEvent}
                onHandlerStateChange={handleStateChange}
            >
                <Animated.View
                    style={[
                        styles.container,
                        { transform: [{ translateX }] },
                        isHovered ? styles.containerHovered : null,
                    ]}
                >
                <Text style={styles.text}>A</Text>
                <Text style={styles.text}>d</Text>
                <Text style={styles.text}>i</Text>
                <Text style={styles.text}>c</Text>
                <Text style={styles.text}>i</Text>
                <Text style={styles.text}>c</Text>
                <Text style={styles.text}>i</Text>
                <Text style={styles.text}>o</Text>
                <Text style={styles.text}>n</Text>
                <Text style={styles.text}>a</Text>
                <Text style={styles.text}>r</Text>
                <Text style={styles.text}> </Text>
                <Text style={styles.text}>a</Text>
                <Text style={styles.text}> </Text>
                <Text style={styles.text}>f</Text>
                <Text style={styles.text}>a</Text>
                <Text style={styles.text}>v</Text>
                <Text style={styles.text}>o</Text>
                <Text style={styles.text}>r</Text>
                <Text style={styles.text}>i</Text>
                <Text style={styles.text}>t</Text>
                <Text style={styles.text}>o</Text>
                <Text style={styles.text}>s</Text>
                <Text style={styles.text}>❤️</Text>
                </Animated.View>
            </PanGestureHandler>
      
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: 15,
        height: 550,
        right: -35,
        top: 200,
        zIndex: 10,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3498db',
        borderRadius: 5,
    },
    containerHovered: {
        backgroundColor: 'red',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        display: 'inline-block',
       
       
    },
});

export default AddFavoritesBar;
