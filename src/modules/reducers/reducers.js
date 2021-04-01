import * as actionTypes from '../actions/actionTypes';
import { handleActions, combineActions } from 'redux-actions';
import { combineReducers } from 'redux';

const {
    SEARCH_RECIPES_START, 
    SEARCH_RECIPES_SUCCESS, 
    FETCH_RECIPE_START, 
    FETCH_RECIPE_SUCCESS, 
    ADD_INGREDIENT, 
    REMOVE_INGREDIENT, 
    TOGGLE_ADD_NEW_INGREDIENT,
    SET_EDITED_INGREDIENT
} = actionTypes;

const foundRecipeReducer = handleActions({
    [SEARCH_RECIPES_SUCCESS]: (state, {foundRecipes}) => foundRecipes
}, []);

const isLoadingReducer = handleActions({
    [combineActions(SEARCH_RECIPES_START, FETCH_RECIPE_START)]: () => true,
    [combineActions(SEARCH_RECIPES_SUCCESS, FETCH_RECIPE_SUCCESS)]: () => false
}, false);

const fetchedRecipeReducer = handleActions({
    [FETCH_RECIPE_SUCCESS]: (state, {fetchedRecipe}) => fetchedRecipe,
    [ADD_INGREDIENT]: (state, {newIngredient}) => ({
        ...state, // poprzedni stan reducera (czyli całe recipe)
        ingredients: [
            ...state.ingredients,
            newIngredient
        ]
    }),
    [REMOVE_INGREDIENT]: (state, {ingredientId}) => ({
        ...state,
        ingredients: state.ingredients.filter(ing => ing.id !== ingredientId)
    })
}, {});

const addNewIngredientShownReducer = handleActions({
    [TOGGLE_ADD_NEW_INGREDIENT]: state => !state
}, false);

const editedIngredientReducer = handleActions({
    [SET_EDITED_INGREDIENT]: (state, {editedIngredientId}) => editedIngredientId
}, null);

export default combineReducers({
    foundRecipes: foundRecipeReducer,
    isLoading: isLoadingReducer,
    fetchedRecipe: fetchedRecipeReducer,
    addNewIngredientShown: addNewIngredientShownReducer,
    editedIngredient: editedIngredientReducer
});
