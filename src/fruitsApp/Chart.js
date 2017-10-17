import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './chart.scss';

class Chart extends Component {
  state = { barWidthsByFruitName: {}};

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.fruits, this.props.fruits)) this._chart.resetBarWidths();
  }

  _chart = (() => {
    const calcBarWidths = ({ orderedFruits, totalCount }) => setTimeout(() => {
      const barWidthsByFruitName = {};
      orderedFruits.forEach(({ fruitName, count }) => {
        barWidthsByFruitName[fruitName] = `${(count / totalCount) * 100}%`;
      });
      this.setState({ barWidthsByFruitName });
    }, 50);
    const parseFruits = fruits => {
      const fruitsByFruitName = _.groupBy(fruits, ({ favoriteFruit }) => favoriteFruit);
      const fruitNames = _.keys(fruitsByFruitName);
      const counts = _.map(fruitsByFruitName, fruits => fruits.length);
      const countsByFruitName = _.zipObject(fruitNames, counts);
      const orderedFruits = _.chain(countsByFruitName)
        .map((count, fruitName) => ({ fruitName, count: parseInt(count, 10) }))
        .orderBy(['count'], ['desc'])
        .value();
      const totalCount = orderedFruits.reduce((total, fruit) => total + fruit.count, 0);
      return { fruitsByFruitName, orderedFruits, totalCount };
    };
    return {
      resetBarWidths: () => this.setState({ barWidthsByFruitName: {}}),
      render: () => {
        const { fruits } = this.props;
        const { fruitsByFruitName, orderedFruits, totalCount } = parseFruits(fruits);
        console.log({ fruitsByFruitName, orderedFruits, totalCount });
        calcBarWidths({ orderedFruits, totalCount })
        return (
          <div>
            {orderedFruits.map(({ fruitName, count }) => {
              return (
                <div className="fruits-chart-row" key={fruitName}>
                  <div className="fruits-chart-column fruits-chart-name">{fruitName}</div>
                  <div className="fruits-chart-column fruits-chart-bar-container">
                    <span className="fruits-chart-bar" style={{ width: this.state.barWidthsByFruitName[fruitName] || 0 }}></span>
                  </div>
                  <div className="fruits-chart-column fruits-chart-count">{count}</div>
                </div>
              );
            })}
          </div>
        );
      },
    };
  })();

  render() {
    return (
      <div className="fruits-chart-container">
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

