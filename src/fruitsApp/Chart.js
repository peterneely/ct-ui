import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Chart extends Component {
  _chart = (() => {
    return {
      render: () => '',
    };
  })();

  render() {
    return (
      <div>
        {this._chart.render()}
      </div>
    );
  }
}

Chart.propTypes = {
  actions: PropTypes.object.isRequired,
  fruits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Chart;

