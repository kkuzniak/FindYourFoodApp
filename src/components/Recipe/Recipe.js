import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './Recipe.module.scss';
import RecipeIngredients from './RecipeIngredients/RecipeIngredients';
import * as actions from '../../modules/actions/index';
import { getAddNewIngredientShown, getEditIngredientShown, getFetchedRecipe } from '../../modules/selectors';
import Loader from '../../UI/Loader';
import ManageIngredientView from './RecipeIngredients/ManageIngredientView/ManageIngredientView';
import isEmpty from 'lodash/isEmpty';

const Recipe = () => {
    const fetchedRecipe = useSelector(getFetchedRecipe);
    const addNewIngredientShown = useSelector(getAddNewIngredientShown);
    const editIngredientShown = useSelector(getEditIngredientShown);
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
                <img src={fetchedRecipe?.image} alt="recipe background"/>
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
            {addNewIngredientShown && <ManageIngredientView title={"Add new ingredient"} buttonName="Add"/>}
            {editIngredientShown && <ManageIngredientView title="Edit ingredient" buttonName="Save"/>}
        </div>
    );
};

export default React.memo(Recipe);