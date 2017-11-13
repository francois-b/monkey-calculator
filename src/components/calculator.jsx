import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    /* eslint react/no-array-index-key: "off" */
    const hist = this.props.calc.history.filter(this.filterHistory);
    return hist.map((item, i) => {
      return <div key={i} className="history-item">{item}</div>;
    });
  }

  render() {
    const getKeyClassName = (keyName) => {
      if (keyName === this.props.calc.keyPressed) {
        return 'pressed';
      }
      return null;
    };

    const renderButton = (keyName) => {
      return (
        <button
          onClick={() => { this.handleOperationClick(keyName); }}
          className={getKeyClassName(keyName)}
        >
          {keyName}
        </button>
      );
    };

    return (
      <div id="calculator">
        <div id="keypad">
          <p>Result: {this.props.calc.error ? 'ERROR' : this.props.calc.mainResult}</p>
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
          <button onClick={this.handleMonkeyClick}>
            Monkey Mode: {this.props.calc.monkeyMode ? 'ON' : 'OFF'}
          </button>
        </div>
        <div id="searchpad">
          <p>Computation History</p>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          {this.renderHistory()}
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
