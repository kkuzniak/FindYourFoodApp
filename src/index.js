import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './index.scss';
import App from './App';
import reducers from './modules/reducers/reducers';
import { BrowserRouter as Router } from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <Router>
            <App/>  
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));