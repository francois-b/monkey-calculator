/* eslint no-underscore-dangle: "off" */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { ConnectedApp } from './components/calculator.jsx';
import { appReducer } from './reducers';

const store = createStore(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('app'),
);
