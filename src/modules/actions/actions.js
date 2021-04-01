import * as actionTypes from './actionTypes';
import {axiosSearchRecipe} from '../../axios-config';
import {axiosGetRecipeById} from '../../axios-config';
import { v4 as uuid } from 'uuid';

export const searchRecipesStart = () => {
    return {
        type: actionTypes.SEARCH_RECIPES_START
    }
};

export const searchRecipesSuccess = (results) => {
    return {
        type: actionTypes.SEARCH_RECIPES_SUCCESS,
        foundRecipes: results
    };
};

export const searchRecipes = (text) => {
    return dispatch => {
        dispatch(searchRecipesStart());
        axiosSearchRecipe.get('/complexSearch', {
            params: {
                query: text,
                number: 40
            }
        })
        .then(res => {
            dispatch(searchRecipesSuccess(res.data.results));
        });
    };
};

export const fetchRecipeStart = () => {
    return {
        type: actionTypes.FETCH_RECIPE_START
    };
};

export const fetchRecipeSuccess = (recipe) => {
    return {
        type: actionTypes.FETCH_RECIPE_SUCCESS,
        fetchedRecipe: recipe
    };
};

export const fetchRecipe = (recId) => 
    async (dispatch) => {
        dispatch(fetchRecipeStart());
        const res = await axiosGetRecipeById.get(`/${recId}/information?includeNutrition=false`);
        const {id, title, image, extendedIngredients} = res.data;
        const recipe = {
            id: id,
            title: title,
            image: image,
            ingredients: extendedIngredients.map((ing, index) => {
                return {
                    id: uuid(),
                    name: ing.name,
                    measure: {
                        amount: ing.measures.metric.amount,
                        unit: ing.measures.metric.unitShort
                    }
                };
            })
        };
        dispatch(fetchRecipeSuccess(recipe));
};

export const addIngredient = (newIngredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        newIngredient: newIngredient
    };
};

export const removeIngredient = (ingredientId) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientId: ingredientId
    };
}

export const toggleAddNewIngredient = (addNewIngredientShown) => {
    return {
        type: actionTypes.TOGGLE_ADD_NEW_INGREDIENT,
        addNewIngredientShown: addNewIngredientShown
    };
}

export const toggleEditIngredient = (editedIngredientId) => {
    return {
        type: actionTypes.SET_EDITED_INGREDIENT,
        editedIngredientId
    };
}