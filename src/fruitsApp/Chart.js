import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './chart.scss';
import ChartData from './ChartData';

class Chart extends Component {
  state = { barWidthsByFruitName: {}};

  componentWillReceiveProps(nextProps) {
    const { fruits } = nextProps;
    if (_.isEqual(fruits, this.props.fruits)) return;
    const { calcBarWidths, orderedFruits } = new ChartData(fruits).parseData();
    this.orderedFruits = orderedFruits;
    setTimeout(() => this.setState({ barWidthsByFruitName: calcBarWidths() }), 50);
  }

  orderedFruits = [];

  chart = (() => {
    const { actions: { selectFruit }} = this.props;
    const handleClickBar = (fruitName, count) => () => {
      selectFruit(fruitName);
      /* eslint-disable no-console */
      console.log(`Fruit selected: ${fruitName}, ${count}`);
    };
    return {
      render: () => (
        <div>
          {this.orderedFruits.map(({ fruitName, color, count }) => (
            <div
              className={`fruits-chart-row ${this.props.selectedFruit === fruitName ? 'mod-active' : ''}`.trim()}
              key={fruitName}
              onClick={handleClickBar(fruitName, count)}
            >
              <div className="fruits-chart-column fruits-chart-name">{fruitName}</div>
              <div className="fruits-chart-column fruits-chart-bar-container">
                <span
                  className="fruits-chart-bar"
                  style={{ background: color, width: this.state.barWidthsByFruitName[fruitName] || 0 }}
                />
              </div>
              <div className="fruits-chart-column fruits-chart-count">{count}</div>
            </div>
          ))}
        </div>
      ),
    };
  })();

  render() {
    return (
      <div className="fruits-chart-container">
        {this.chart.render()}
      </div>
    );
  }
}

Chart.propTypes = {
  actions: PropTypes.object.isRequired,
  fruits: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedFruit: PropTypes.string,
};

export default Chart;

