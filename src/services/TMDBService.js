
import { options } from './options.js'

async function getPopularMovies(urlValue) {

    try {
        const response = await fetch(urlValue, options);
        const data = await response.json();
        return data.results || [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

export  { getPopularMovies };

export async function getCardDetailsInfo(urlValue) {

    try {
        const response = await fetch(urlValue, options);
        if (response.ok)
            return await response.json();
        else
            return null;

    } catch (err) {
        console.error(err);
        return [];
    }
}
