import { options } from "./options";

export async function GetSearchResults(term) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${term}&include_adult=false&language=pt-BR&page=1`, options);
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const data = await response.json();
        
        return data.results || [];  
    } catch (err) {
        console.error("Temos um erro", err);
        return []; 
    }
}
