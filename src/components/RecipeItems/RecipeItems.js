import React from 'react';
import { useSelector } from 'react-redux';
import classes from './RecipeItems.module.scss'
import RecipeItem from './RecipeItem/RecipeItem';
import { getRecipes } from '../../modules/selectors';
import { Link } from 'react-router-dom';

const RecipeItems = () => {
    const foundRecipes = useSelector(getRecipes);

    return (
        <section className={classes.RecipeItems}>
            {foundRecipes.map(item =>
                <Link style={{textDecoration: 'none'}} key={item.id} to={`/recipe/${item.id}`}><RecipeItem title={item.title} imgSrc={item.image}/></Link>
            )}
        </section>
    );
};

export default React.memo(RecipeItems);