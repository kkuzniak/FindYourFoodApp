import React from 'react';
import classes from './RecipeItem.module.scss';

const RecipeItem = ({title, imgSrc}) => (
    <div className={classes.RecipeItem}>
        <img className={classes.BackgroundImage} src={imgSrc} alt="recipe background"/>
        <header className={classes.Header}>
            <h2>{title}</h2>
        </header>
    </div>
);

export default RecipeItem;