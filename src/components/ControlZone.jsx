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
        {this.props.uiExpanded ? <RightPanel history={this.props.history} /> : ''}
      </div>
    );
  }
}

ControlZone.propTypes = {
  uiExpanded: PropTypes.bool,
  history: PropTypes.arrayOf(PropTypes.string),
};

ControlZone.defaultProps = {
  uiExpanded: false,
  history: [],
};
