import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.js';
import './index.css';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {Provider} from 'react-redux';
import {legacy_createStore as createStore,applyMiddleware,compose} from 'redux';
const store = createStore(reducers, compose(applyMiddleware(thunk)));

createRoot(document.getElementById('root')).render(
    <Provider store = {store}> 
        <App /> 
    </Provider> 
);
