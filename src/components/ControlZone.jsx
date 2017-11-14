/* eslint jsx-a11y/accessible-emoji: "off" */

import React from 'react';
import PropTypes from 'prop-types';

import { RightPanel } from './RightPanel.jsx';
import { ConnectedLeftPanel } from './LeftPanel.jsx';

export class ControlZone extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', marginBottom: '10px' }}>
        <ConnectedLeftPanel />
        {this.props.isUiExpanded ? <RightPanel computationHistory={this.props.computationHistory} /> : ''}
      </div>
    );
  }
}

ControlZone.propTypes = {
  isUiExpanded: PropTypes.bool,
  computationHistory: PropTypes.arrayOf(PropTypes.string),
};

ControlZone.defaultProps = {
  isUiExpanded: false,
  computationHistory: [],
};
