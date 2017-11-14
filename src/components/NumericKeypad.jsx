import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

const buttonStyle = {
  borderRadius: '25px',
  backgroundColor: '#ddd',
  minWidth: '40px',
  margin: '5px',
};

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
};

export class NumericKeypad extends React.Component {
  getPressedStatus(keyName) {
    if (keyName === this.props.pressedKeyName) {
      return true;
    }
    return false;
  }

  renderButton(keyName) {
    const isPressed = this.getPressedStatus(keyName);
    let style = buttonStyle;
    if (isPressed) {
      style = Object.assign({}, style, { backgroundColor: '#FFB74D' });
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
      <div style={{ display: 'flex' }}>
        <div>
          <div style={rowStyle}>
            {this.renderButton('1')}
            {this.renderButton('2')}
            {this.renderButton('3')}
          </div>

          <div style={rowStyle}>
            {this.renderButton('4')}
            {this.renderButton('5')}
            {this.renderButton('6')}
          </div>

          <div style={rowStyle}>
            {this.renderButton('7')}
            {this.renderButton('8')}
            {this.renderButton('9')}
          </div>
          <div style={rowStyle}>
            {this.renderButton('0')}
            {this.renderButton('.')}
            <FlatButton
              style={buttonStyle}
              onClick={this.props.handleClearClick}
            >
              c
            </FlatButton>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
  pressedKeyName: PropTypes.string,
  handleOperationClick: PropTypes.func.isRequired,
  handleClearClick: PropTypes.func.isRequired,
};

NumericKeypad.defaultProps = {
  pressedKeyName: '',
};
