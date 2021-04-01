import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../../modules/actions/index';
import classes from './RecipeIngredient.module.scss';

const RecipeIngredient = ({id, name, measure}) => {
    const dispatch = useDispatch();
    const onRemoveIngredient = useCallback((ingId) => dispatch(actions.removeIngredient(ingId)), [dispatch])
    const onToggleEditIngredient = useCallback((isShown, editedIngredientId) => dispatch(actions.toggleEditIngredient(isShown, editedIngredientId)), [dispatch]);

    const removeIngredientHandler = () => {
        onRemoveIngredient(id);
    }

    const showEditIngredientHandler = () => {
        onToggleEditIngredient(true, id);
    }

    return (
        <div className={classes.RecipeIngredient}>
            <div className={classes.LeftMenuContainer}>
                <h3>{name}</h3>
                <button className={classes.EditBtn} onClick={showEditIngredientHandler}> 
                    <i className="fas fa-pen-square"></i>
                </button>
            </div>
            <div className={classes.RightMenuContainer}>
                <div className={classes.Hoverable}></div>
                <h3>{measure}</h3>
                <i className="fas fa-arrows-alt-v"/>
                <button className={classes.RemoveBtn} onClick={removeIngredientHandler}>
                    <i className="fas fa-minus-square"></i>
                </button>
            </div>
        </div>
    );
};

export default RecipeIngredient;