import React from 'react';
import classes from './Navbar.module.scss';
import logoSrc from '../../assets/logo.svg';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <div className={classes.Navbar}>
        <img className={classes.Logo} src={logoSrc} alt="findyourfood logo"/>
        <nav className={classes.Navigation}>
            <Link className={classes.NavigationItem} to="/">Strona główna</Link>
        </nav>
    </div>
);

export default Navbar;