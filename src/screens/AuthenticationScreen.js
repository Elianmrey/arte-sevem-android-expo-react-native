import {  StyleSheet, Text, TextInput, Button, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthenticatingUser } from '../services/AutenticationService.js';
import { useState } from 'react';
import { CameraView } from 'expo-camera';


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
      if(username, password) {
      
    const response = await AuthenticatingUser(username, password);

    if (response && response !=='' && response !== null) {
      // console.log("Resposta de autenticação++++++++++++++++++++++++++++++++++++:", response,);
      return navigation.navigate('ScreensIfAuthenticated', {session:response});
    } 
    else {
      
        alert('Usuário ou senha inválidos');
      
    }
  }else {
    alert('Preencha os campos de usuário e senha');
  }
    } catch (error) {
      alert('Usuário ou senha inválidos');
    }
  }




  return (
    <LinearGradient
      colors={['#1F0428', 'indigo', '#030E1F']}
      style={styles.container}
    >
      <CameraView style={styles.containerCamera}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Text style={styles.title}>Arte Se7em</Text>
      <Text style={styles.text}>Usuário:</Text>
      <TextInput placeholder="Username" onChangeText={(text) => InnTextControl('username', text)} style={styles.inputText} />
      <Text style={styles.text}>Senha:</Text>
      <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(text) => InnTextControl('password', text)} style={styles.inputText} />
      <Button title="Entrar ⏩" onPress={() => useAsuthentication(loginData.username, loginData.password, navigation)} />
      </CameraView >
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCamera: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  text: {
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
