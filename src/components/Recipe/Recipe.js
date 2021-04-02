import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './Recipe.module.scss';
import RecipeIngredients from './RecipeIngredients/RecipeIngredients';
import * as actions from '../../modules/actions/index';
import { getAddNewIngredientShown, getFetchedRecipe, getEditedIngredientId } from '../../modules/selectors';
import Loader from '../../UI/Loader';
import ManageIngredientView from './RecipeIngredients/ManageIngredientView/ManageIngredientView';
import isEmpty from 'lodash/isEmpty';

const Recipe = () => {
    const fetchedRecipe = useSelector(getFetchedRecipe);
    const addNewIngredientShown = useSelector(getAddNewIngredientShown);
    const editedIngredientId = useSelector(getEditedIngredientId);
    const {id} = useParams();

    const dispatch = useDispatch();
    const onFetchRecipe = useCallback(id => dispatch(actions.fetchRecipe(id)), [dispatch]);
    const onToggleAddNewIngredient = useCallback(isShown => dispatch(actions.toggleAddNewIngredient(isShown)), [dispatch]);

    useEffect(() => {
        onFetchRecipe(id);
    }, [onFetchRecipe, id]);

    const showAddNewIngredientHandler = () => {
        onToggleAddNewIngredient(true);
    }

    if (isEmpty(fetchedRecipe)) {
        return <Loader/>
    }

    return (
        <div className={classes.Recipe}>
            <section className={classes.ImageContainer}>
                {fetchedRecipe?.image ? <img src={fetchedRecipe.image} alt="recipe background"/> : <span>Recipe has no image</span>}
            </section>
            <section className={classes.DetailsContainer}>
                <h1 className={classes.MainTitle}>{fetchedRecipe?.title}</h1>
                <header className={classes.IngredientsHeader}>
                    <h2>Ingredients</h2>
                    <h3>Count</h3>
                </header>
                <div className={classes.Line}></div>
                {fetchedRecipe?.ingredients && <RecipeIngredients ingredients={fetchedRecipe.ingredients}/>}       
                <button className={classes.AddIngredientButton} onClick={showAddNewIngredientHandler}>Add ingredient</button>
            </section>
            {(addNewIngredientShown || editedIngredientId) && <ManageIngredientView title={editedIngredientId ? "Edit ingredient" : "Add new ingredient"} buttonName={editedIngredientId ? "Save" : "Add"}/>}
        </div>
    );
};

export default React.memo(Recipe);