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
