import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './ManageIngredientView.module.scss';
import * as actions from '../../../../modules/actions/index';
import { v4 as uuid } from 'uuid';
import { getEditedIngredientId, getFetchedRecipe } from '../../../../modules/selectors';

const selectOptions = [
    'pc',
    'Tbsp',
    'tsps',
    'cup',
    'g',
    'kg',
    'ml',
    'servings',
    'slice',
    'large'
];

const ManageIngredientView = ({title, buttonName}) => {
    const [nameInput, setNameInput] = useState('');
    const [amountInput, setAmountInput] = useState(1);
    const [unitInput, setUnitInput] = useState('g');

    const editedIngredientId = useSelector(getEditedIngredientId);
    const fetchedRecipeIngredients = useSelector(getFetchedRecipe).ingredients;

    const dispatch = useDispatch();
    const onSaveIngredient = useCallback(ingredient => dispatch(actions.saveIngredient(ingredient)), [dispatch]);
    const onToggleAddNewIngredient = useCallback(isShown => dispatch(actions.toggleAddNewIngredient(isShown)), [dispatch]);
    const onSetEditedIngredientId = useCallback(editedIngredientId => dispatch(actions.setEditedIngredientId(editedIngredientId)), [dispatch]);

    const saveIngredientHandler = () => {
        onSaveIngredient({
            id: editedIngredientId ? editedIngredientId : uuid(),
            name: nameInput,
            measure: {
                amount: amountInput,
                unit: unitInput
            }
        });
        hideViewHandler();
    };

    useEffect(() => {
        if (editedIngredientId) {
            const ingredient = fetchedRecipeIngredients.find(el => el.id === editedIngredientId);
            setNameInput(ingredient.name);
            setAmountInput(ingredient.measure.amount.toFixed(1));
            setUnitInput(ingredient.measure.unit);
        }    
    }, [editedIngredientId, fetchedRecipeIngredients])


    const hideViewHandler = () => {
        editedIngredientId == null ? onToggleAddNewIngredient(false) : onSetEditedIngredientId(null);
    }

    return (
        <div className={classes.ManageIngredientView}>
            <div className={classes.Content}>
                <h2 className={classes.MainTitle}>{title}</h2>
                <section className={classes.InputsSection}>
                    <input placeholder="Name of your ingredient" className={classes.Input} value={nameInput} onChange={(event) => setNameInput(event.target.value)} type="text"/>
                    <input className={classes.Input} value={amountInput} onChange={(event) => setAmountInput(event.target.value)} type="number"/>
                    <select className={classes.Input} value={unitInput} onChange={(event) => setUnitInput(event.target.value)}>
                        {selectOptions.map((opt, index) => (<option key={index} value={opt}>{opt}</option>))}
                    </select>
                </section>
                <button className={classes.SaveBtn} onClick={saveIngredientHandler}>{buttonName}</button>
                <button className={classes.CloseButton} onClick={hideViewHandler}>
                    <i className="fas fa-times"/>
                </button>
            </div>
            <div className={classes.ShadeBackground} onClick={hideViewHandler}></div>
        </div>
    );
};

export default ManageIngredientView;