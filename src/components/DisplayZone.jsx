/* eslint react/prop-types: "off" */

import React from 'react';

export const DisplayZone = ({ calculatorflexDirection, children }) => (
  <div style={{
    backgroundColor: '#1976D2',
    display: 'flex',
    flexDirection: calculatorflexDirection,
  }}
  >
    {children}
  </div>
);
