import React from 'react';
import classes from './Loader.module.scss';

const Loader = () => (
    <div className={classes.Loader}></div>
);

export default React.memo(Loader);