// Actions
export const addOperationChar = (char) => {
  return {
    type: 'ADD_OPERATION_CHARACTER',
    char,
  };
};

export const goCompute = () => {
  return {
    type: 'GO_COMPUTE',
  };
};

export const clearDisplay = () => {
  return {
    type: 'CLEAR_DISPLAY',
  };
};

export const monkeyMouseDown = (pressedKeyName) => {
  return {
    type: 'MONKEY_MOUSEDOWN',
    pressedKeyName,
  };
};

export const monkeyMouseUp = (pressedKeyName) => {
  return {
    type: 'MONKEY_MOUSEUP',
    pressedKeyName,
  };
};

export const monkeyModeActivation = () => {
  return {
    type: 'MONKEY_MODE_ON',
  };
};

export const monkeyModeDeactivation = () => {
  return {
    type: 'MONKEY_MODE_OFF',
  };
};

export const toggleUI = () => {
  return {
    type: 'TOGGLE_UI',
  };
};

const chooseNextKey = (currentComputation = '') => {
  const numberChoices = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const operationChoices = ['+', '-', '*', '/', '.'];
  const lastChar = currentComputation.charAt(currentComputation.length - 1);

  if (lastChar === '' || operationChoices.indexOf(lastChar) !== -1 ||
    ['.'].indexOf(lastChar) !== -1) {
    // We need to follow that up with a number.
    // NOTE: Don't choose 0, hence the "length - 1"
    const index = Math.floor(Math.random() * (numberChoices.length - 1));
    return numberChoices[index];
  }
  // The last key press was a number, so we could go either with a number or
  // an operation.
  const choices = numberChoices.concat(operationChoices);
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
};

export const monkeyMouseDownAsync = () => {
  return (dispatch, getState) => {
    const currentComp = getState().calculator.currentComputation;
    const key = chooseNextKey(currentComp);
    dispatch(addOperationChar(key));

    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(key) !== -1) {
      // We can press Go on occasions if the last character was a number
      if (Math.random() > 0.75) {
        dispatch(goCompute());
        dispatch(clearDisplay());
      }
    }

    const delay = 0;

    setTimeout(() => {
      dispatch(monkeyMouseDown(key));
    }, delay);

    setTimeout(() => {
      dispatch(monkeyMouseUp(key));
    }, delay + 100);

    if (getState().calculator.monkeyMode) {
      setTimeout(() => {
        dispatch(monkeyMouseDownAsync());
      }, delay + 150);
    }
  };
};
