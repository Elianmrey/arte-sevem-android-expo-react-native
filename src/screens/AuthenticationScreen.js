// import { GetRequestToken } from '../services/AutenticationService.js';

  // `https://www.themoviedb.org/authenticate/`
  import {StyleSheet, Text } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient';
  import { AuthenticatingUser } from '../services/AutenticationService.js';
import { useEffect } from 'react';


 
  export default function AuthenticationScreen() {

useEffect(() => {
async function authenticateUser() {

  username = "ElianMR93";
  password = "EmrTMDB!$@#26082019";

 await AuthenticatingUser(username, password);
}
authenticateUser();
  }, []);

    return (
      <LinearGradient
      colors={['#1F0428', 'indigo', '#030E1F']} style={styles.container}>
        <Text style={styles.title}>Autenticando...</Text>
      </LinearGradient>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
    },
  });

