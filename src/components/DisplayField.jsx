/* eslint react/prop-types: "off" */

import React from 'react';
import TextField from 'material-ui/TextField';

export const DisplayField = props => (
  <TextField
    value={props.value}
    style={{ marginLeft: 20 }}
    inputStyle={{ color: 'white' }}
    underlineShow={false}
    floatingLabelText={props.label}
    floatingLabelFixed
    floatingLabelFocusStyle={{ color: 'white' }}
    floatingLabelShrinkStyle={{ color: 'white' }}
    {...props}
  />
);
