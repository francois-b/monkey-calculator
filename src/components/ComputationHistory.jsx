import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

export default class ComputationHistory extends React.Component {
  constructor() {
    super();
    this.filterHistory = this.filterHistory.bind(this);
  }

  getComputationHistory() {
    const hist = this.props.computationHistory.filter(this.filterHistory);
    return hist.reverse().map((item) => {
      return (
        <div
          key={shortid.generate()}
          className="computationHistory-item"
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
        {this.getComputationHistory()}
      </div>
    );
  }
}

ComputationHistory.propTypes = {
  computationHistory: PropTypes.arrayOf(PropTypes.string),
  searchValue: PropTypes.string,
};

ComputationHistory.defaultProps = {
  computationHistory: [],
  searchValue: '',
};
