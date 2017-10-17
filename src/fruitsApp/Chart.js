import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './chart.scss';

class Chart extends Component {
  _chart = (() => {
    const parseFruits = fruits => {
      const fruitsByFruitName = _.groupBy(fruits, ({ favoriteFruit }) => favoriteFruit);
      const fruitNames = _.keys(fruitsByFruitName);
      const counts = _.map(fruitsByFruitName, fruits => fruits.length);
      const countsByFruitName = _.zipObject(fruitNames, counts);
      const orderedFruits = _.chain(countsByFruitName)
        .map((count, fruitName) => ({ fruitName, count: parseInt(count, 10) }))
        .orderBy(['count'], ['desc'])
        .value();
      return { fruitsByFruitName, orderedFruits };
    };
    return {
      render: () => {
        const { fruits } = this.props;
        const { fruitsByFruitName, orderedFruits } = parseFruits(fruits);
        console.log({ fruitsByFruitName, orderedFruits });
        return (
          <div>
            {orderedFruits.map(({ fruitName, count }) => {
              return (
                <div className="fruits-chart-row" key={fruitName}>
                  <div className="fruits-chart-name">{fruitName}</div>
                  <div className="fruits-chart-count">{count}</div>
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

