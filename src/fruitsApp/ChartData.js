import _ from 'lodash';
import { createRandomColor } from './colorFactory';

export default class ChartData {
  constructor(fruits) {
    this._fruits = fruits;
  }

  _chartFruits = (() => {
    let orderedFruits = [];
    let totalCount = 0;
    const calcBarWidths = () => {
      if (!totalCount) return;
      const barWidthsByFruitName = {};
      orderedFruits.forEach(({ fruitName, count }) => {
        barWidthsByFruitName[fruitName] = `${(count / totalCount) * 100}%`;
      });
      return barWidthsByFruitName;
    };
    return {
      parseData: () => {
        if (!this._fruits.length) return { orderedFruits: [], totalCount };
        const fruitsByFruitName = _.groupBy(this._fruits, ({ favoriteFruit }) => favoriteFruit);
        const fruitNames = _.keys(fruitsByFruitName);
        const counts = _.map(fruitsByFruitName, fruits => fruits.length);
        const countsByFruitName = _.zipObject(fruitNames, counts);
        orderedFruits = _.chain(countsByFruitName)
          .map((count, fruitName) => ({
            fruitName,
            color: createRandomColor(),
            count: parseInt(count, 10),
          }))
          .orderBy(['count'], ['desc'])
          .value();
        totalCount = orderedFruits.reduce((total, fruit) => total + fruit.count, 0);
        return { calcBarWidths, orderedFruits };
      },
    };
  })();

  parseData = this._chartFruits.parseData;
}
