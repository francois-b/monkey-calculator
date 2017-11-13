// Reducers
/* eslint no-eval: "off" */
import { combineReducers } from 'redux';

const initState = {
  mainResult: 0,
  currentComputation: '',
};

const calculatorReducer = (state = initState, action) => {
  let computedValue;
  switch (action.type) {
    case 'ADD_OPERATION_CHARACTER':
      return Object.assign({}, state, {
        currentComputation: state.currentComputation + action.char,
      });
    case 'GO_COMPUTE':
      try {
        computedValue = eval(state.currentComputation);
      } catch (e) {
        console.log('error', e);
        computedValue = 0;
      }
      return Object.assign({}, state, {
        mainResult: computedValue,
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
