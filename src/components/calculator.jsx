import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    const renderButton = (keyName) => {
      return (
        <button>
          {keyName}
        </button>
      );
    };

    return (
      <div id="calculator">
        <div id="keypad">
          <p>Result: </p>
          <p>Current Op: </p>
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
          <button>GO =</button>
          <button>C</button>
        </div>
      </div>
    );
  }
}

export const ConnectedApp = connect()(App);
