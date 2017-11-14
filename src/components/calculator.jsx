
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

import { addOperationChar, goCompute, clearDisplay, monkeyClickAsync,
  monkeyModeActivation, monkeyModeDeactivation } from '../actions';
import { DisplayField } from './DisplayField.jsx';
import { DisplayZone } from './DisplayZone.jsx';
import { ControlZone } from './ControlZone.jsx';

class App extends React.Component {
  render() {
    const calculatorWidth = this.props.calc.uiExpanded ? '600px' : '220px';
    const calculatorflexDirection = this.props.calc.uiExpanded ? 'row' : 'column-reverse';

    return (
      <Paper id="calculator" style={{ width: calculatorWidth }}>
        <DisplayZone calculatorflexDirection={calculatorflexDirection}>
          <DisplayField
            hintText="---"
            value={`${this.props.calc.currentComputation}`}
            label="Current Operation"
          />
          <DisplayField
            hintText="---"
            value={this.props.calc.error ? 'ERROR' : this.props.calc.mainResult}
            label="Result"
          />

        </DisplayZone>

        <Divider style={{ marginBottom: '10px' }} />
        <ControlZone {...this.props} expanded={this.props.calc.uiExpanded} />
      </Paper>
    );
  }
}

App.propTypes = {
  calc: PropTypes.shape().isRequired,
  onOperationClick: PropTypes.func.isRequired,
  onGoClick: PropTypes.func.isRequired,
  onClearClick: PropTypes.func.isRequired,
  onMonkeyModeDeactivate: PropTypes.func.isRequired,
  onMonkeyModeActivate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    calc: state.calculator,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOperationClick: (char) => {
      dispatch(addOperationChar(char));
    },
    onGoClick: () => {
      dispatch(goCompute());
    },
    onClearClick: () => {
      dispatch(clearDisplay());
    },
    onMonkeyModeActivate: () => {
      dispatch(monkeyModeActivation());
      dispatch(monkeyClickAsync());
    },
    onMonkeyModeDeactivate: () => {
      dispatch(monkeyModeDeactivation());
    },
  };
};

export const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
