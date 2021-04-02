import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import classes from './Navbar.module.scss';
import logoSrc from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import * as actions from '../../modules/actions/index';

const Navbar = () => {
    const dispatch = useDispatch();
    const onResetFetchedRecipe = useCallback(() => dispatch(actions.resetFetchedRecipe()), [dispatch]);

    const homePageLinkClickHandler = () => {
        onResetFetchedRecipe();
    }

    return (
        <div className={classes.Navbar}>
            <img className={classes.Logo} src={logoSrc} alt="findyourfood logo"/>
            <nav className={classes.Navigation}>
                <Link onClick={homePageLinkClickHandler} className={classes.NavigationItem} to="/">Strona główna</Link>
            </nav>
        </div>
    );
};

export default Navbar;