/* eslint jsx-a11y/accessible-emoji: "off" */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

import { toggleUI, addOperationChar, goCompute, clearDisplay, monkeyMouseDownAsync,
  monkeyModeActivation, monkeyModeDeactivation } from '../actions';
import NumericKeypad from './NumericKeypad.jsx';

const primaryButtonStyle = {
  width: '80px',
  borderRadius: '25px',
  backgroundColor: '#ddd',
  marginLeft: '5px',
  marginTop: '10px',
};

const fadedButtonStyle = {
  width: '130px',
  borderRadius: '25px',
  backgroundColor: '#f4f4f4',
  marginLeft: '5px',
  marginTop: '10px',
  fontSize: '12px',
};

class LeftPanel extends React.Component {
  constructor() {
    super();
    this.handleMonkeyClick = this.handleMonkeyClick.bind(this);
    this.handleGoClick = this.handleGoClick.bind(this);
  }

  handleMonkeyClick() {
    if (this.props.monkeyMode) {
      this.props.onMonkeyModeDeactivate();
    } else {
      this.props.onMonkeyModeActivate();
    }
  }

  handleGoClick() {
    this.props.onGoClick();
  }

  render() {
    const leftPanelStyle = {
      marginLeft: '10px',
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
    };
    return (
      <div style={leftPanelStyle}>
        <NumericKeypad
          handleOperationClick={this.props.onOperationClick}
          pressedKeyName={this.props.pressedKeyName}
          handleClearClick={this.props.onClearClick}
        />

        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
          <FlatButton
            onClick={this.handleGoClick}
            style={primaryButtonStyle}
          >
            =
          </FlatButton>
          <FlatButton
            onClick={this.handleMonkeyClick}
            style={primaryButtonStyle}
          >
            🐒: {this.props.monkeyMode ? 'ON' : 'OFF'}
          </FlatButton>
        </div>
        <FlatButton
          onClick={() => { this.props.onToggleUI(); }}
          style={fadedButtonStyle}
        >
          toggle history view
        </FlatButton>
      </div>
    );
  }
}

LeftPanel.propTypes = {
  pressedKeyName: PropTypes.string,
  monkeyMode: PropTypes.bool,
  onMonkeyModeDeactivate: PropTypes.func.isRequired,
  onMonkeyModeActivate: PropTypes.func.isRequired,
  onOperationClick: PropTypes.func.isRequired,
  onGoClick: PropTypes.func.isRequired,
  onClearClick: PropTypes.func.isRequired,
  onToggleUI: PropTypes.func.isRequired,
};

LeftPanel.defaultProps = {
  pressedKeyName: null,
  monkeyMode: false,
};

const mapStateToProps = (state) => {
  return {
    pressedKeyName: state.calculator.pressedKeyName,
    monkeyMode: state.calculator.monkeyMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleUI: () => {
      dispatch(toggleUI());
    },
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
      dispatch(monkeyMouseDownAsync());
    },
    onMonkeyModeDeactivate: () => {
      dispatch(monkeyModeDeactivation());
    },
  };
};

const ConnectedLeftPanel = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeftPanel);

export default ConnectedLeftPanel;
