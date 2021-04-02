import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchRecipesValue } from '../../modules/selectors';
import classes from './SearchBar.module.scss';
import * as actions from '../../modules/actions/index';
import classNames from 'classnames';

const SearchBar = () => {
    const [inputValue, setInputValue] = useState('');
    const inputEl = useRef(null);

    const searchRecipesValue = useSelector(getSearchRecipesValue);

    const dispatch = useDispatch();
    const onSearchRecipes = useCallback((inputText) => dispatch(actions.searchRecipes(inputText)), [dispatch]);
    const onResetSearchedRecipes = useCallback(() => dispatch(actions.resetSearchedRecipes()), [dispatch]);

    useEffect(() => {
        searchRecipesValue && setInputValue(searchRecipesValue);
    }, [searchRecipesValue]);

    const inputChangeHandler = useCallback((event) => {
        setInputValue(event.target.value);    
    }, [setInputValue]);

    const cleanInputHandler = useCallback(() => {
        onResetSearchedRecipes();
        setInputValue('');
    }, [setInputValue, onResetSearchedRecipes]);

    const submitHandler = useCallback((event) => {
        event.preventDefault();
        onSearchRecipes(inputEl.current.value);
    }, [onSearchRecipes]);

    const clearButtonClasses = classNames(
        classes.ClearButton, 
        inputValue.length > 0 ? classes.ClearButtonShown : classes.ClearButtonHidden
    );

    return (
        <div className={classes.SearchBar}>
            <form>
                <label className={classes.TextFieldSection}>
                    <input ref={inputEl} className={classes.TextField} placeholder="Search your recipe" type="text" value={inputValue} onChange={inputChangeHandler}/>
                    <button className={clearButtonClasses} type="button" onClick={cleanInputHandler}>
                            <i className="fas fa-times"></i>
                    </button>
                </label>

                <div className={classes.ButtonsContainer}>
                    <button className={classes.SubmitButton} type="submit" onClick={submitHandler}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>  
            </form>
        </div>
    );
};

export default React.memo(SearchBar);