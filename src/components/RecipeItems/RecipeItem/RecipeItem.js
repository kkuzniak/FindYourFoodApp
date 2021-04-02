import React from 'react';
import classes from './RecipeItem.module.scss';
import PropTypes from 'prop-types';

const RecipeItem = ({title, imgSrc}) => (
    <div className={classes.RecipeItem}>
        <img className={classes.BackgroundImage} src={imgSrc} alt="recipe background"/>
        <header className={classes.Header}>
            <h2>{title}</h2>
        </header>
    </div>
);

RecipeItem.propTypes = {
    title: PropTypes.string,
    imgSrc: PropTypes.string
};

export default React.memo(RecipeItem);