import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addOperationChar, goCompute, clearDisplay } from '../actions';

class App extends React.Component {
  constructor() {
    super();
    this.handleOperationClick = this.handleOperationClick.bind(this);
    this.handleGoClick = this.handleGoClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
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

  render() {
    const renderButton = (keyName) => {
      return (
        <button
          onClick={() => { this.handleOperationClick(keyName); }}
        >
          {keyName}
        </button>
      );
    };

    return (
      <div id="calculator">
        <div id="keypad">
          <p>Result: {this.props.calc.mainResult}</p>
          <p>Current Op: {this.props.calc.currentComputation}</p>
          <div className="calc-container">
            <div className="calc-row">
              {renderButton('1')}
              {renderButton('2')}
              {renderButton('3')}
            </div>

            <div className="calc-row">
              {renderButton('4')}
              {renderButton('5')}
              {renderButton('6')}
            </div>

            <div className="calc-row">
              {renderButton('7')}
              {renderButton('8')}
              {renderButton('9')}
            </div>

            <div className="calc-row">
              {renderButton('+')}
              {renderButton('-')}
              {renderButton('*')}
              {renderButton('/')}
              {renderButton('.')}
            </div>

          </div>
          <button onClick={this.handleGoClick}>GO =</button>
          <button onClick={this.handleClearClick}>C</button>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  calc: PropTypes.shape().isRequired,
  onOperationClick: PropTypes.func.isRequired,
  onGoClick: PropTypes.func.isRequired,
  onClearClick: PropTypes.func.isRequired,
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
  };
};

export const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
