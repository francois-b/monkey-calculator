/* eslint react/prop-types: "off" */

import React from 'react';
import TextField from 'material-ui/TextField';

import { ComputationHistory } from './ComputationHistory.jsx';

export class RightPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  render() {
    return (
      <div id="keypad-right">
        <div id="searchpad">
          <TextField
            floatingLabelText="Search"

            onChange={this.handleChange}
          />
          <ComputationHistory
            history={this.props.calc.history}
            searchValue={this.state.searchValue}
          />
        </div>
      </div>
    );
  }
}
