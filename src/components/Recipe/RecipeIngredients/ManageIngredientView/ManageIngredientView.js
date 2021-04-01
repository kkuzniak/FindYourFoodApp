import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './ManageIngredientView.module.scss';
import * as actions from '../../../../modules/actions/index';
import { v4 as uuid } from 'uuid';
import { getEditIngredientShown } from '../../../../modules/selectors';

const selectOptions = [
    'pc',
    'Tbsp',
    'tsp',
    'cup',
    'g',
    'kg',
    'ml'
];

const ManageIngredientView = ({title, buttonName}) => {
    const [nameInput, setNameInput] = useState('');
    const [amountInput, setAmountInput] = useState(1);
    const [unitInput, setUnitInput] = useState('g');

    const editIngredientShown = useSelector(getEditIngredientShown);

    const dispatch = useDispatch();
    const onAddIngredient = useCallback(newIngredient => dispatch(actions.addIngredient(newIngredient)), [dispatch]);
    const onToggleAddNewIngredient = useCallback(isShown => dispatch(actions.toggleAddNewIngredient(isShown)), [dispatch]);
    const onToggleEditIngredient = useCallback(isShown => dispatch(actions.toggleEditIngredient(isShown)), [dispatch]);

    const addNewIngredientHandler = () => {
        const newIngredient = {
            id: uuid(),
            name: nameInput,
            measure: {
                amount: amountInput,
                unit: unitInput
            }
        };
        onAddIngredient(newIngredient);
        hideViewHandler();
    };

    const saveEditedIngredientHandler = () => {
        
    };

    const hideViewHandler = () => {
        if (editIngredientShown) {
            onToggleEditIngredient(false);
        } else {
            onToggleAddNewIngredient(false);
        }
    }

    if (editIngredientShown) {
        // setNameInput
    }

    return (
        <div className={classes.ManageIngredientView}>
            <form className={classes.Content}>
                <h2 className={classes.MainTitle}>{title}</h2>
                <section className={classes.InputsSection}>
                    <input placeholder="Name of your ingredient" className={classes.Input} value={nameInput} onChange={(event) => setNameInput(event.target.value)} type="text"/>
                    <input className={classes.Input} value={amountInput} onChange={(event) => setAmountInput(event.target.value)} type="number"/>
                    <select className={classes.Input} value={unitInput} onChange={(event) => setUnitInput(event.target.value)}>
                        {selectOptions.map((opt, index) => (<option key={index} value={opt}>{opt}</option>))}
                    </select>
                </section>
                <button className={classes.AddBtn} onClick={addNewIngredientHandler}>{buttonName}</button>
                <button className={classes.CloseButton} onClick={hideViewHandler}>
                    <i className="fas fa-times"/>
                </button>
            </form>
            <div className={classes.ShadeBackground} onClick={hideViewHandler}></div>
        </div>
    );
};

export default ManageIngredientView;