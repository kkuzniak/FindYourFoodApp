import * as actionTypes from '../actions/actionTypes';
import { handleActions, combineActions } from 'redux-actions';
import { combineReducers } from 'redux';

const {
    RESET_SEARCHED_RECIPES,
    SEARCH_RECIPES_START, 
    SEARCH_RECIPES_SUCCESS, 
    RESET_FETCHED_RECIPE,
    FETCH_RECIPE_START, 
    FETCH_RECIPE_SUCCESS, 
    SAVE_INGREDIENT, 
    REMOVE_INGREDIENT, 
    TOGGLE_ADD_NEW_INGREDIENT,
    SET_EDITED_INGREDIENT_ID,
    DROP_INGREDIENT
} = actionTypes;

const foundRecipesReducer = handleActions({
    [SEARCH_RECIPES_SUCCESS]: (state, {foundRecipes}) => foundRecipes,
    [RESET_SEARCHED_RECIPES]: state => []
}, []);

const searchRecipesValueReducer = handleActions({
    [SEARCH_RECIPES_START]: (state, {searchValue}) => searchValue
}, '')

const isLoadingReducer = handleActions({
    [combineActions(SEARCH_RECIPES_START, FETCH_RECIPE_START)]: () => true,
    [combineActions(SEARCH_RECIPES_SUCCESS, FETCH_RECIPE_SUCCESS)]: () => false
}, false);

const fetchedRecipeReducer = handleActions({
    [RESET_FETCHED_RECIPE]: state => {},
    [FETCH_RECIPE_SUCCESS]: (state, {fetchedRecipe}) => fetchedRecipe,
    [SAVE_INGREDIENT]: (state, {ingredient}) => {
        const indexOfEdited = state.ingredients.findIndex(ing => ing.id === ingredient.id);
        if (indexOfEdited !== -1) {
            const newIngredients = [...state.ingredients];
            newIngredients[indexOfEdited] = ingredient
            return {
                ...state,
                ingredients: newIngredients
            }
        }

        return ({
        ...state, // poprzedni stan reducera (czyli całe recipe)
        ingredients: [
            ...state.ingredients,
            ingredient
        ]
    })
    },
    [REMOVE_INGREDIENT]: (state, {ingredientId}) => ({
        ...state,
        ingredients: state.ingredients.filter(ing => ing.id !== ingredientId)
    }),
    [DROP_INGREDIENT]: (state, {sourceIndex, destinationIndex}) => {
        const newIngredients = [...state.ingredients];
        const [reorderedItem] = newIngredients.splice(sourceIndex, 1);
        newIngredients.splice(destinationIndex, 0, reorderedItem);

        return ({
            ...state,
            ingredients: newIngredients
        })  
    }
}, {});

const addNewIngredientShownReducer = handleActions({
    [TOGGLE_ADD_NEW_INGREDIENT]: state => !state
}, false);

const setEditedIngredientIdReducer = handleActions({
    [SET_EDITED_INGREDIENT_ID]: (state, {editedIngredientId}) => editedIngredientId
}, null);

export default combineReducers({
    searchRecipesValue: searchRecipesValueReducer,
    foundRecipes: foundRecipesReducer,
    isLoading: isLoadingReducer,
    fetchedRecipe: fetchedRecipeReducer,
    addNewIngredientShown: addNewIngredientShownReducer,
    editedIngredientId: setEditedIngredientIdReducer,
});
