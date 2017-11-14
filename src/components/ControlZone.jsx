/* eslint jsx-a11y/accessible-emoji: "off", react/prop-types: "off" */

import React from 'react';

import { RightPanel } from './RightPanel.jsx';
import { ConnectedLeftPanel } from './LeftPanel.jsx';

export class ControlZone extends React.Component {
  render() {
    return (
      <div id="control-zone">
        <ConnectedLeftPanel />
        {this.props.uiExpanded ? <RightPanel history={this.props.history} /> : ''}
      </div>
    );
  }
}
