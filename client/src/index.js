import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './index.css';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'; // corrected import

// Apply middleware and create store
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk)
  )
);

// Render the app
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);