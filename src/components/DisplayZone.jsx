/* eslint react/prop-types: "off" */

import React from 'react';

export const DisplayZone = ({ uiExpanded, children }) => {
  const calculatorflexDirection = uiExpanded ? 'row' : 'column-reverse';
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
