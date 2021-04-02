import axios from 'axios';

const key = 'a696eef2ee3743f5a9cd7016928dfa3a';

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