// Reducers
/* eslint no-eval: "off" */
import { combineReducers } from 'redux';

const initState = {
  mainResult: 0,
  currentComputation: '',
  hasComputationError: false,
  computationHistory: [],
  pressedKeyName: null,
  monkeyMode: false,
  isUiExpanded: false,
};

const calculatorReducer = (state = initState, action) => {
  let computedValue;
  let hasComputationError;
  let historyRecord;

  switch (action.type) {
    case 'ADD_OPERATION_CHARACTER':
      return Object.assign({}, state, {
        currentComputation: state.currentComputation + action.char,
      });
    case 'GO_COMPUTE':
      try {
        hasComputationError = false;
        computedValue = eval(state.currentComputation);
      } catch (e) {
        console.log('Computation Error:', e);
        computedValue = 0;
        hasComputationError = true;
      }
      historyRecord = `${state.currentComputation} = ${computedValue}`;
      return Object.assign({}, state, {
        mainResult: computedValue,
        computationHistory: state.computationHistory.concat(historyRecord),
        hasComputationError,
      });
    case 'CLEAR_DISPLAY':
      return Object.assign({}, state, { currentComputation: '', hasComputationError: false });
    case 'MONKEY_MOUSEDOWN':
      return Object.assign({}, state, { pressedKeyName: action.pressedKeyName });
    case 'MONKEY_MOUSEUP':
      return Object.assign({}, state, { pressedKeyName: null });
    case 'MONKEY_MODE_ON':
      return Object.assign({}, state, { monkeyMode: true });
    case 'MONKEY_MODE_OFF':
      return Object.assign({}, state, { monkeyMode: false });
    case 'TOGGLE_UI':
      return Object.assign({}, state, { isUiExpanded: !state.isUiExpanded });
    default:
      return state;
  }
};

export const appReducer = combineReducers({
  calculator: calculatorReducer,
});
