import * as actionTypes from './actionTypes';
import {axiosSearchRecipe} from '../../axios-config';
import {axiosGetRecipeById} from '../../axios-config';
import { v4 as uuid } from 'uuid';

export const resetSearchedRecipes = () => ({type: actionTypes.RESET_SEARCHED_RECIPES});
export const searchRecipesStart = (searchValue) => ({type: actionTypes.SEARCH_RECIPES_START, searchValue});
export const searchRecipesSuccess = (results) => ({type: actionTypes.SEARCH_RECIPES_SUCCESS, foundRecipes: results});

export const searchRecipes = (text) => {
    return dispatch => {
        dispatch(searchRecipesStart(text));
        axiosSearchRecipe.get('/complexSearch', {
            params: {
                query: text,
                number: 10
            }
        })
        .then(res => {
            dispatch(searchRecipesSuccess(res.data.results));
        });
    };
};

export const resetFetchedRecipe = () => ({type: actionTypes.RESET_FETCHED_RECIPE});
export const fetchRecipeStart = () => ({type: actionTypes.FETCH_RECIPE_START});

export const fetchRecipeSuccess = (recipe) => ({type: actionTypes.FETCH_RECIPE_SUCCESS, fetchedRecipe: recipe});

export const fetchRecipe = recId => 
    async dispatch => {
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

export const saveIngredient = (ingredient) => ({type: actionTypes.SAVE_INGREDIENT, ingredient});
export const removeIngredient = (ingredientId) => ({type: actionTypes.REMOVE_INGREDIENT, ingredientId});
export const dropIngredient = (sourceIndex, destinationIndex) => ({type: actionTypes.DROP_INGREDIENT, sourceIndex, destinationIndex});
export const toggleAddNewIngredient = (addNewIngredientShown) => ({type: actionTypes.TOGGLE_ADD_NEW_INGREDIENT, addNewIngredientShown});
export const setEditedIngredientId = (editedIngredientId) => ({type: actionTypes.SET_EDITED_INGREDIENT_ID, editedIngredientId});