
import { options } from './options.js'

async function getInfo(urlValue) {

    try {
        const response = await fetch(urlValue, options);
        const data = await response.json();
        return data.results;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export { getInfo };

