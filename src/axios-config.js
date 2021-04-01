import axios from 'axios';

const key = '3f697d27361c4dfba68c0d5c332bf541';

export const axiosSearchRecipe = axios.create({
    baseURL: 'https://api.spoonacular.com/recipes/',
    params: {
        apiKey: key
    }
});

export const axiosGetRecipeById = axios.create({
    baseURL: 'https://api.spoonacular.com/recipes/',
    params: {
        apiKey: key
    }
});