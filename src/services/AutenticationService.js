import axios from 'axios';
import { options, optionPost } from './options';
import * as Linking from 'expo-linking';


let request_token = null;

async function GetRequestToken() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/authentication/token/new', options);
        const data = await response.json();

        if (data?.request_token) {
           console.log("Token de acesso obtido-------------------------------------++++++++++++++++-----------------:", data.request_token);

             //PASSO # 2 Redirecionar para o site do TMDB
          // await redirectToTMDb( data.request_token); 
          
          request_token = data.request_token
        }
    } catch (err) {
        console.error("Erro na obtenção do token:", err);
        return null;
    }
}
 

// PASSO # 2 Validar o Token 
async function ValidateToken(username, password) {
 
  const responseAuth = await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login`, 
    {
    ...optionPost, body: JSON.stringify({
      username: username,
      password: password,
      request_token: request_token}),
});

const dataAuth = await responseAuth.json();

if (dataAuth.request_token) {

    // console.log("Autenticação bem-sucedida-----------------------+++++++++++++++:", dataAuth);

    return dataAuth;
}
else {
console.error("Erro ao obter o token:", dataAuth);
return null;
}

}


 async function SessionIdRequest(username, password) {
    try {
        //PASSO #1 obtér o token de acesso para a API
          await GetRequestToken();
         
          //PASSO #2 Validar o token de acesso para a API
      const validatedToken = await ValidateToken(username, password);
          
      //PASSO #3 Obtém um session ID para o usuário
      if (validatedToken && validatedToken.request_token) {
          
        const responseSession = await fetch(`https://api.themoviedb.org/3/authentication/session/new?request_token=${validatedToken.request_token}`, options);
          const dataSession = await responseSession.json();
          //  console.log("Resposta de autenticação antes de verificar o session ID       ----------------------------------------------------------------:", dataSession);
          if (dataSession.session_id) {
          
            //PASSO #4 Obtém um session ID para o usuário
          const sessionId = dataSession.session_id;

          //  console.log("Session ID obtido Agora------------------------------------------------:", sessionId);
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

// Autenticar o usuário FUNÇÃO PRINCIPAL PARA AUTENTICAÇÃO...
export async function AuthenticatingUser(username, password) {
    try {
        const response = await SessionIdRequest(username,password);

        if (response) {
          // console.log("Resposta de autenticação++++++++++++++++++++++++++++++++++++:", response,);
           return response;
        }

    } catch (err) {
        console.error("Erro na autenticação do usuário:", err);
        return null;
    }
}