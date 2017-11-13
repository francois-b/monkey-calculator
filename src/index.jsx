/* eslint no-underscore-dangle: "off" */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { ConnectedApp } from './components/calculator.jsx';
import { appReducer } from './reducers';
import { monkeyModeActivation, monkeyModeDeactivation, monkeyClickAsync } from './actions';

const store = createStore(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

function handleSpaceBarPress(event) {
  if (event.code === 'Space') {
    if (store.getState().calculator.monkeyMode) {
      store.dispatch(monkeyModeDeactivation());
    } else {
      store.dispatch(monkeyModeActivation());
      store.dispatch(monkeyClickAsync());
    }
    event.preventDefault();
  }
}

document.onkeydown = handleSpaceBarPress;

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('app'),
);
