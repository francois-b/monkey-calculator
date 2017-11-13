// Reducers
/* eslint no-eval: "off" */
import { combineReducers } from 'redux';

const initState = {
  mainResult: 0,
  currentComputation: '',
  error: false,
  history: [],
};

const calculatorReducer = (state = initState, action) => {
  let computedValue;
  let errorPresent;

  switch (action.type) {
    case 'ADD_OPERATION_CHARACTER':
      return Object.assign({}, state, {
        currentComputation: state.currentComputation + action.char,
      });
    case 'GO_COMPUTE':
      try {
        errorPresent = false;
        computedValue = eval(state.currentComputation);
      } catch (e) {
        console.log('error', e);
        computedValue = 0;
        errorPresent = true;
      }
      return Object.assign({}, state, {
        mainResult: computedValue,
        history: state.history.concat(state.currentComputation),
        error: errorPresent,
      });
    case 'CLEAR_DISPLAY':
      return Object.assign({}, state, { currentComputation: '', error: false });
    default:
      return state;
  }
};

export const appReducer = combineReducers({
  calculator: calculatorReducer,
});
