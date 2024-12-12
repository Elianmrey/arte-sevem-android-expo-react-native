import { ActivityIndicator, StyleSheet, Text, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthenticatingUser } from '../services/AutenticationService.js';
import { useState } from 'react';
import { AsyncStorage } from 'react-native';


export default function AuthenticationScreen({navigation}) {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const InnTextControl = (field, value) => {
    setLoginData((prevData) => ({ ...prevData, [field]: value }));
  };


  const useAsuthentication = async (username, password, navigation) => {
    try {
    const response = await AuthenticatingUser(username, password);

    if (response) {
      console.log("Resposta de autenticação++++++++++++++++++++++++++++++++++++:", response,);
      return navigation.navigate('ScreensIfAuthenticated', {session:response});
    }
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <LinearGradient
      colors={['#1F0428', 'indigo', '#030E1F']}
      style={styles.container}
    >
      <Text style={styles.title}>Usuário:</Text>
      <TextInput placeholder="Username" onChangeText={(text) => InnTextControl('username', text)} style={styles.inputText} />
      <Text style={styles.title}>Senha:</Text>
      <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(text) => InnTextControl('password', text)} style={styles.inputText} />
      <Button title="Entrar ✌️" onPress={() => useAsuthentication(loginData.username, loginData.password, navigation)} />
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
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  inputText: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
