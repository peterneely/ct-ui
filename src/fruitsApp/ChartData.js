import _ from 'lodash';
import { createRandomColor } from './colorFactory';

export default class ChartData {
  constructor(people) {
    this._people = people;
  }

  _chartFruits = (() => {
    let orderedFruits = [];
    let totalCount = 0;
    const calcBarWidths = () => {
      if (!totalCount) return;
      const barWidthsByFruitName = {};
      orderedFruits.forEach(({ fruitName, count }) => {
        barWidthsByFruitName[fruitName] = `${parseInt((count / totalCount) * 100)}%`;
      });
      return barWidthsByFruitName;
    };
    return {
      parse: () => {
        if (!this._people.length) return { orderedFruits: [], totalCount: 0 };
        const fruitsByFruitName = _.groupBy(this._people, ({ favoriteFruit }) => favoriteFruit);
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

  parse = this._chartFruits.parse;
}
