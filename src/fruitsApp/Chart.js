import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './chart.scss';

class Chart extends Component {
  state = { barWidthsByFruitName: {}};

  componentWillReceiveProps(nextProps) {
    const { fruits } = nextProps;
    if (_.isEqual(fruits, this.props.fruits)) return;
    const { orderedFruits, totalCount } = this._fruitParser.parseFruits(fruits);
    setTimeout(() => this._chart.calcBarWidths(orderedFruits, totalCount), 50);
  }

  _colorFactory = (() => {
    const letters = '0123456789ABCDEF';
    return {
      createRandomColor: () => {
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
    };
  })();

  _fruitParser = (colorFactory => {
    let orderedFruits = [];
    return {
      getOrderedFruits: () => orderedFruits,
      parseFruits: fruits => {
        if (!fruits.length) return { orderedFruits: [], totalCount };
        const fruitsByFruitName = _.groupBy(fruits, ({ favoriteFruit }) => favoriteFruit);
        const fruitNames = _.keys(fruitsByFruitName);
        const counts = _.map(fruitsByFruitName, fruits => fruits.length);
        const countsByFruitName = _.zipObject(fruitNames, counts);
        orderedFruits = _.chain(countsByFruitName)
          .map((count, fruitName) => ({
            fruitName,
            color: colorFactory.createRandomColor(),
            count: parseInt(count, 10),
          }))
          .orderBy(['count'], ['desc'])
          .value();
        const totalCount = orderedFruits.reduce((total, fruit) => total + fruit.count, 0);
        return { orderedFruits, totalCount };
      },
    };
  })(this._colorFactory);

  _chart = (fruitParser => {
    const { actions: { selectFruit }} = this.props;
    const handleClickBar = (fruitName, count) => () => {
      selectFruit(fruitName);
      /* eslint-disable no-console */
      console.log(`Fruit selected: ${fruitName}, ${count}`);
    };
    return {
      calcBarWidths: (orderedFruits, totalCount) => {
        if (!totalCount) return;
        const barWidthsByFruitName = {};
        orderedFruits.forEach(({ fruitName, count }) => {
          barWidthsByFruitName[fruitName] = `${(count / totalCount) * 100}%`;
        });
        this.setState({ barWidthsByFruitName });
      },
      render: () => (
        <div>
          {fruitParser.getOrderedFruits().map(({ fruitName, color, count }) => {
            return (
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
            );
          })}
        </div>
      ),
    };
  })(this._fruitParser);

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
  selectedFruit: PropTypes.string,
};

export default Chart;

