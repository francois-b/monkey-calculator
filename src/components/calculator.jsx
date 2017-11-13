/* eslint jsx-a11y/accessible-emoji: "off" */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

import { addOperationChar, goCompute, clearDisplay, monkeyClickAsync,
  monkeyModeActivation, monkeyModeDeactivation } from '../actions';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: null,
    };
    this.handleOperationClick = this.handleOperationClick.bind(this);
    this.handleGoClick = this.handleGoClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.renderHistory = this.renderHistory.bind(this);
    this.filterHistory = this.filterHistory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMonkeyClick = this.handleMonkeyClick.bind(this);
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

  handleChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  handleMonkeyClick() {
    if (this.props.calc.monkeyMode) {
      this.props.onMonkeyModeDeactivate();
    } else {
      this.props.onMonkeyModeActivate();
    }
  }

  filterHistory(item) {
    if (this.state.searchValue === null || this.state.searchValue === '') {
      return true;
    }
    if (item.search(this.state.searchValue) !== -1) {
      return true;
    }
    return false;
  }

  renderHistory() {
    /* eslint react/no-array-index-key: 'off' */
    const hist = this.props.calc.history.filter(this.filterHistory);
    return hist.reverse().map((item, i) => {
      return (
        <div
          key={i}
          className="history-item"
        >
          {item}
        </div>
      );
    });
  }

  render() {
    const getPressedStatus = (keyName) => {
      if (keyName === this.props.calc.keyPressed) {
        return true;
      }
      return false;
    };

    const renderButton = (keyName) => {
      const isPressed = getPressedStatus(keyName);
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
    };

    return (
      <Paper id="calculator">
        <div style={{ backgroundColor: '#1976D2' }}>
          <TextField
            value={`${this.props.calc.currentComputation}`}
            style={{ marginLeft: 20 }}
            inputStyle={{ color: 'white' }}
            underlineShow={false}
            floatingLabelText="Current Operation"
            floatingLabelFixed
            floatingLabelFocusStyle={{ color: 'white' }}
            floatingLabelShrinkStyle={{ color: 'white' }}
          />
          <TextField
            value={this.props.calc.error ? 'ERROR' : this.props.calc.mainResult}
            style={{ marginLeft: 20 }}
            inputStyle={{ color: 'white' }}
            underlineShow={false}
            floatingLabelText="Result"
            floatingLabelFixed
            floatingLabelFocusStyle={{ color: 'white' }}
            floatingLabelShrinkStyle={{ color: 'white' }}
          />

        </div>
        <Divider style={{ marginBottom: '10px' }} />
        <div id="keypad">
          <div id="keypad-left">
            <div id="calc-secondary-keys">
              <div className="calc-num-container">
                <div className="calc-num-row">
                  {renderButton('1')}
                  {renderButton('2')}
                  {renderButton('3')}
                </div>

                <div className="calc-num-row">
                  {renderButton('4')}
                  {renderButton('5')}
                  {renderButton('6')}
                </div>

                <div className="calc-num-row">
                  {renderButton('7')}
                  {renderButton('8')}
                  {renderButton('9')}
                </div>
                <div className="calc-num-row">
                  {renderButton('0')}
                  {renderButton('.')}
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
                {renderButton('+')}
                {renderButton('-')}
                {renderButton('*')}
                {renderButton('/')}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
              <FlatButton
                onClick={this.handleGoClick}
                style={{
                  width: '80px',
                  borderRadius: '25px',
                  backgroundColor: '#ddd',
                  marginLeft: '5px',
                  marginTop: '10px',
                }}
              >
                =
              </FlatButton>
              <FlatButton
                onClick={this.handleMonkeyClick}
                style={{
                  width: '80px',
                  borderRadius: '25px',
                  backgroundColor: '#ddd',
                  marginLeft: '5px',
                  marginTop: '10px',
                }}
              >
                🐒: {this.props.calc.monkeyMode ? 'ON' : 'OFF'}
              </FlatButton>
            </div>
          </div>

          <div id="keypad-right">
            <div id="searchpad">
              <TextField
                floatingLabelText="Search"

                onChange={this.handleChange}
              />

              <div style={{ overflowY: 'scroll', height: '100px' }}>
                {this.renderHistory()}
              </div>
            </div>
          </div>
        </div>
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
