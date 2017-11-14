import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

export class NumericKeypad extends React.Component {
  getPressedStatus(keyName) {
    if (keyName === this.props.keyPressed) {
      return true;
    }
    return false;
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
        onClick={() => { this.props.handleOperationClick(keyName); }}
      >
        {keyName}
      </FlatButton>
    );
  }

  render() {
    return (
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
              onClick={this.props.handleClearClick}
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
    );
  }
}

NumericKeypad.propTypes = {
  keyPressed: PropTypes.string,
  handleOperationClick: PropTypes.func.isRequired,
  handleClearClick: PropTypes.func.isRequired,
};

NumericKeypad.defaultProps = {
  keyPressed: '',
};
