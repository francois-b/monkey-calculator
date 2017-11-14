/* eslint jsx-a11y/accessible-emoji: "off", react/prop-types: "off" */

import React from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

import { toggleUI, addOperationChar, goCompute, clearDisplay, monkeyClickAsync,
  monkeyModeActivation, monkeyModeDeactivation } from '../actions';

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

export class LeftPanel extends React.Component {
  constructor() {
    super();
    this.renderButton = this.renderButton.bind(this);
    this.getPressedStatus = this.getPressedStatus.bind(this);
    this.handleMonkeyClick = this.handleMonkeyClick.bind(this);
    this.handleOperationClick = this.handleOperationClick.bind(this);
    this.handleGoClick = this.handleGoClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
  }

  getPressedStatus(keyName) {
    if (keyName === this.props.keyPressed) {
      return true;
    }
    return false;
  }

  handleMonkeyClick() {
    if (this.props.monkeyMode) {
      this.props.onMonkeyModeDeactivate();
    } else {
      this.props.onMonkeyModeActivate();
    }
  }

  handleOperationClick(value) {
    this.props.onOperationClick(value);
  }

  handleGoClick() {
    this.props.onGoClick();
  }

  handleClearClick() {
    this.props.onClearClick();
  }

  renderButton(keyName) {
    const isPressed = this.getPressedStatus(keyName);
    const style = {
      borderRadius: '25px',
      backgroundColor: '#ddd',
      minWidth: '40px',
      margin: '5px',
    };
    if (isPressed) {
      style.backgroundColor = '#FFB74D';
    }
    return (
      <FlatButton
        style={style}
        onClick={() => { this.handleOperationClick(keyName); }}
      >
        {keyName}
      </FlatButton>
    );
  }

  render() {
    return (
      <div id="left-panel">
        <div id="calc-secondary-keys">
          <div className="calc-num-container">
            <div className="calc-num-row">
              {this.renderButton('1')}
              {this.renderButton('2')}
              {this.renderButton('3')}
            </div>

            <div className="calc-num-row">
              {this.renderButton('4')}
              {this.renderButton('5')}
              {this.renderButton('6')}
            </div>

            <div className="calc-num-row">
              {this.renderButton('7')}
              {this.renderButton('8')}
              {this.renderButton('9')}
            </div>
            <div className="calc-num-row">
              {this.renderButton('0')}
              {this.renderButton('.')}
              <FlatButton
                style={{
                  borderRadius: '25px',
                  backgroundColor: '#ddd',
                  minWidth: '40px',
                  margin: '5px',
                }}
                onClick={this.handleClearClick}
              >
                c
              </FlatButton>
            </div>
          </div>
          <div className="calc-operations-bunch">
            {this.renderButton('+')}
            {this.renderButton('-')}
            {this.renderButton('*')}
            {this.renderButton('/')}
          </div>
        </div>
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

const mapStateToProps = (state) => {
  return {
    keyPressed: state.calculator.keyPressed,
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
      dispatch(monkeyClickAsync());
    },
    onMonkeyModeDeactivate: () => {
      dispatch(monkeyModeDeactivation());
    },
  };
};

export const ConnectedLeftPanel = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeftPanel);
