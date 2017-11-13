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

export const monkeyClick = (keyPressed) => {
  return {
    type: 'MONKEY_CLICK',
    keyPressed,
  };
};

export const monkeyUnClick = (keyPressed) => {
  return {
    type: 'MONKEY_UNCLICK',
    keyPressed,
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

const chooseNextKey = (currentComputation = '') => {
  const numberChoices = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const operationChoices = ['+', '-', '*', '/']; // , '.'];
  // TODO: FIX THE FLOATS
  const lastChar = currentComputation.charAt(currentComputation.length - 1);
  // console.log("lastChar:",lastChar);
  if (lastChar === '' || operationChoices.indexOf(lastChar) !== -1) {
    // The last key press was an operation, so we need to follow that up with
    // a number.
    // NOTE: Don't choose 0
    const index = Math.floor(Math.random() * (numberChoices.length - 1));
    return numberChoices[index];
  }
  // The last key press was a number, so we could go either with a number or
  // an operation.
  const choices = numberChoices.concat(operationChoices).concat(operationChoices);
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
};

export const monkeyClickAsync = () => {
  return (dispatch, getState) => {
    const currentComp = getState().calculator.currentComputation;
    const key = chooseNextKey(currentComp);
    dispatch(addOperationChar(key));

    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(key) !== -1) {
      // We can press Go on occasions
      if (Math.random() > 0.75) {
        dispatch(goCompute());
        dispatch(clearDisplay());
      }
    }

    const delay = 0;

    setTimeout(() => {
      dispatch(monkeyClick(key));
    }, delay);

    setTimeout(() => {
      dispatch(monkeyUnClick(key));
    }, delay + 200);

    if (getState().calculator.monkeyMode) {
      setTimeout(() => {
        dispatch(monkeyClickAsync());
      }, delay + 300);
    }
  };
};
