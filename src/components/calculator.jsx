import React from 'react';
import { connect } from 'react-redux';

const App = () => (
  <h1>Hello</h1>
);

export const ConnectedApp = connect()(App);
