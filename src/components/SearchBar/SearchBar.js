import React, { useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import classes from './SearchBar.module.scss';
import * as actions from '../../modules/actions/index';

const SearchBar = () => {
    const [inputValue, setInputValue] = useState('');
    const inputEl = useRef(null);

    const dispatch = useDispatch();

    const onSearchRecipes = useCallback((inputText) => dispatch(actions.searchRecipes(inputText)), [dispatch]);

    const inputChangeHandler = useCallback((event) => {
        setInputValue(event.target.value);    
    }, [setInputValue]);

    const submitHandler = useCallback((event) => {
        event.preventDefault();
        onSearchRecipes(inputEl.current.value);
    }, [onSearchRecipes]);

    return (
        <div className={classes.SearchBar}>
            <form>
                <input ref={inputEl} className={classes.TextField} placeholder="Search your recipe" type="text" value={inputValue} onChange={inputChangeHandler}/>
                <button className={classes.SubmitButton} type="submit" onClick={submitHandler}>
                    <i className="fas fa-search"></i>
                </button>
            </form>
        </div>
    );
};

export default SearchBar;