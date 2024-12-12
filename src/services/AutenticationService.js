import axios from 'axios';
import { options, optionPost } from './options';
import * as Linking from 'expo-linking';


let request_token = null;

async function GetRequestToken() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/authentication/token/new', options);
        const data = await response.json();

        if (data?.request_token) {
           console.log("Token de acesso obtido:", data.request_token);

              request_token = data.request_token

            //PASSO # 2 Redirecionar para o site do TMDB
          await redirectToTMDb(request_token);
        }
    } catch (err) {
        console.error("Erro na obtenção do token:", err);
        return null;
    }
}
 

//Redirecionar para o site do TMDB (Utilidade de GetRequestToken)
async function redirectToTMDb(requestToken) {
  const url = `https://www.themoviedb.org/authenticate/${requestToken}`;
  try {
  
    const response = await Linking.openURL(url);
    
    console.log("Token Retornado com aprovação de autenticação  ", response);

   if (!response) {
      throw new Error('Nenhuma resposta recebida ao redirecionar para o navegador.');
    }else if (response.ok ) {
      return requestToken;
    }
    
    
  } catch (err) {
    console.error("Erro ao redirecionar para o navegador:", err);
  }
  
}






// PASSO # 2 Validar o Token 
async function ValidateToken(username, password,request_token_sent) {
 
  const responseAuth = await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login`, 
    {
    ...optionPost, body: JSON.stringify({
      username: username,
      password: password,
      request_token: request_token_sent}),
});

const dataAuth = await responseAuth.json();


// console.log("Resposta de autenticação-=-=-=-=-=-=-=-=-=-=-=-=-=-:", dataAuth);

if (dataAuth.request_token) {

    console.log("Autenticação bem-sucedida-----------------------+++++++++++++++:", dataAuth);

    return dataAuth;
}
else {
console.error("Erro ao obter o token:", data);
return null;
}

}





export async function SessionIdRequest(username, password) {
    try {
        //PASSO #1 obtém um token de acesso para a API
          await GetRequestToken();
         
          //PASSO #2 Redirecionar para o site do TMDB
      const validatedToken = await ValidateToken(username, password, request_token);
          
      //PASSO #3 Obtém um session ID para o usuário
      if (validatedToken && validatedToken.request_token) {
          
        const responseSession = await fetch(`https://api.themoviedb.org/3/authentication/session/new?request_token=${validatedToken.request_token}`, options);
          const dataSession = await responseSession.json();
          
          if (dataSession.session_id) {
          //PASSO #4 Obtém um session ID para o usuário
             console.log("Resposta de autenticação----------------------------------------------------------------:", dataSession);
          const sessionId = dataSession.session_id;
           console.log("Session ID obtido Agora------------------------------------------------:", sessionId);

           return sessionId;
           } else {
          console.error("Erro ao obter o session ID:", dataSession);
         
           }
          };
         
        

        

       } catch (err) {
        console.error("Erro na obtenção do session ID:", err);
        return null;
    }
}

// Autenticar o usuário
export async function AuthenticatingUser(username, password) {
    try {
        const response = await SessionIdRequest(username,password);

        if (response) {
          console.log("Resposta de autenticação:", response, 'Codigo: ', response.status);
           
           return response;
        }

    } catch (err) {
        console.error("Erro na autenticação do usuário:", err);
    }
}