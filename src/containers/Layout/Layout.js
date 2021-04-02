import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import classes from './Layout.module.scss';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipeItems from '../../components/RecipeItems/RecipeItems';
import { useSelector } from 'react-redux';
import { getIsLoading, getRecipes } from '../../modules/selectors';
import Loader from '../../UI/Loader';
import Recipe from '../../components/Recipe/Recipe';
import { Route, Switch } from 'react-router-dom';

const Layout = () => {
    const foundRecipes = useSelector(getRecipes);
    const isLoading = useSelector(getIsLoading);

    let content = <div></div>;

    if (foundRecipes) {
        content = <RecipeItems/>;
    } 

    if (isLoading) {
        content = <Loader/>;
    }

    return (
        <div className={classes.Layout}>
            <Navbar/>
            <Switch>
                <Route path="/" exact>
                    <SearchBar/>
                    {content}
                </Route>
                <Route path="/recipe/:id">
                    <Recipe/>
                </Route>
            </Switch>
        </div>
    );
};

export default React.memo(Layout);