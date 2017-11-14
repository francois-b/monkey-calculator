import React from 'react';

export class ComputationHistory extends React.Component {
  constructor() {
    super();
    this.filterHistory = this.filterHistory.bind(this);
  }

  getHistory() {
    /* eslint react/no-array-index-key: 'off', react/prop-types: 'off' */
    const hist = this.props.history.filter(this.filterHistory);
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

  filterHistory(item) {
    if (this.props.searchValue === null || this.props.searchValue === '') {
      return true;
    }
    if (item.search(this.props.searchValue) !== -1) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div style={{ overflowY: 'scroll', height: '100px' }}>
        {this.getHistory()}
      </div>
    );
  }
}
