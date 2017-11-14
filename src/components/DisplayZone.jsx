import React from 'react';
import PropTypes from 'prop-types';

export const DisplayZone = ({ isUiExpanded, children }) => {
  const calculatorflexDirection = isUiExpanded ? 'row' : 'column-reverse';
  return (
    <div style={{
      backgroundColor: '#1976D2',
      display: 'flex',
      flexDirection: calculatorflexDirection,
    }}
    >
      {children}
    </div>
  );
};

DisplayZone.propTypes = {
  isUiExpanded: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

DisplayZone.defaultProps = {
  isUiExpanded: false,
};
