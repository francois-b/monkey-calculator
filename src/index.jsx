/* eslint no-underscore-dangle: "off" */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ConnectedApp from './components/Calculator.jsx';
import { appReducer } from './reducers';
import { monkeyModeActivation, monkeyModeDeactivation, monkeyMouseDownAsync } from './actions';

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
      store.dispatch(monkeyMouseDownAsync());
    }
    event.preventDefault();
  }
}

document.onkeydown = handleSpaceBarPress;

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app'),
);
