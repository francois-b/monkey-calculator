import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

import ComputationHistory from './ComputationHistory.jsx';

export default class RightPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: null,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  render() {
    return (
      <div id="keypad-right">
        <div id="searchpad">
          <TextField
            floatingLabelText="Search"
            onChange={this.handleSearchChange}
          />
          <ComputationHistory
            computationHistory={this.props.computationHistory}
            searchValue={this.state.searchValue}
          />
        </div>
      </div>
    );
  }
}

RightPanel.propTypes = {
  computationHistory: PropTypes.arrayOf(PropTypes.string),
};

RightPanel.defaultProps = {
  computationHistory: [],
};
