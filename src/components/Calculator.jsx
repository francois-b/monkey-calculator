import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import { DisplayField } from './DisplayField.jsx';
import { DisplayZone } from './DisplayZone.jsx';
import { ControlZone } from './ControlZone.jsx';

class App extends React.Component {
  render() {
    const calculatorWidth = this.props.uiExpanded ? '600px' : '220px';
    const calculatorStyle = {
      display: 'flex',
      flexDirection: 'column',
      margin: '30px',
      width: calculatorWidth,
    };

    return (
      <Paper id="calculator" style={calculatorStyle}>
        <DisplayZone uiExpanded={this.props.uiExpanded}>
          <DisplayField
            hintText="---"
            value={`${this.props.currentComputation}`}
            label="Current Operation"
          />
          <DisplayField
            hintText="---"
            value={this.props.error ? 'ERROR' : this.props.mainResult}
            label="Result"
          />

        </DisplayZone>

        <Divider style={{ marginBottom: '10px' }} />
        <ControlZone
          history={this.props.history}
          uiExpanded={this.props.uiExpanded}
        />
      </Paper>
    );
  }
}

App.propTypes = {
  mainResult: PropTypes.number,
  uiExpanded: PropTypes.bool,
  error: PropTypes.bool,
  currentComputation: PropTypes.string,
  history: PropTypes.arrayOf(PropTypes.string),
};

App.defaultProps = {
  mainResult: 0,
  uiExpanded: false,
  error: false,
  currentComputation: '',
  history: [],
};

const mapStateToProps = (state) => {
  return {
    mainResult: state.calculator.mainResult,
    uiExpanded: state.calculator.uiExpanded,
    error: state.calculator.error,
    currentComputation: state.calculator.currentComputation,
    history: state.calculator.history,
  };
};

export const ConnectedApp = connect(
  mapStateToProps,
  null,
)(App);
