import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import DisplayField from './DisplayField.jsx';
import DisplayZone from './DisplayZone.jsx';
import ControlZone from './ControlZone.jsx';

class App extends React.Component {
  render() {
    const calculatorWidth = this.props.isUiExpanded ? '600px' : '220px';
    const calculatorStyle = {
      display: 'flex',
      flexDirection: 'column',
      margin: '30px',
      width: calculatorWidth,
    };

    return (
      <Paper id="calculator" style={calculatorStyle}>
        <DisplayZone isUiExpanded={this.props.isUiExpanded}>
          <DisplayField
            hintText="---"
            value={`${this.props.currentComputation}`}
            label="Current Operation"
          />
          <DisplayField
            hintText="---"
            value={this.props.hasComputationError ? 'ERROR' : this.props.mainResult}
            label="Result"
          />

        </DisplayZone>

        <Divider style={{ marginBottom: '10px' }} />
        <ControlZone
          computationHistory={this.props.computationHistory}
          isUiExpanded={this.props.isUiExpanded}
        />
      </Paper>
    );
  }
}

App.propTypes = {
  mainResult: PropTypes.number,
  isUiExpanded: PropTypes.bool,
  hasComputationError: PropTypes.bool,
  currentComputation: PropTypes.string,
  computationHistory: PropTypes.arrayOf(PropTypes.string),
};

App.defaultProps = {
  mainResult: 0,
  isUiExpanded: false,
  hasComputationError: false,
  currentComputation: '',
  computationHistory: [],
};

const mapStateToProps = (state) => {
  return {
    mainResult: state.calculator.mainResult,
    isUiExpanded: state.calculator.isUiExpanded,
    hasComputationError: state.calculator.hasComputationError,
    currentComputation: state.calculator.currentComputation,
    computationHistory: state.calculator.computationHistory,
  };
};

const ConnectedApp = connect(
  mapStateToProps,
  null,
)(App);

export default ConnectedApp;
