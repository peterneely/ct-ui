import ChartData from './ChartData';

describe('ChartData', () => {

  it('can parse fruits correctly', () => {
    const people = [
      { name: 'Dennis T.', favoriteFruit: 'grapes' },
      { name: 'Vlad S.', favoriteFruit: 'banana' },
      { name: 'Javier F.', favoriteFruit: 'banana' },
      { name: 'Aaron C.', favoriteFruit: 'grapes' },
      { name: 'Ruby O.', favoriteFruit: 'orange' },
      { name: 'Paco D.', favoriteFruit: 'strawberries' },
      { name: 'Francis P.', favoriteFruit: 'orange' },
      { name: 'Edward J.', favoriteFruit: 'orange' },
      { name: 'Ethan J.', favoriteFruit: 'grapes' },
      { name: 'Wanda T.', favoriteFruit: 'orange' },
      { name: 'Jason T.', favoriteFruit: 'grapes' },
    ];
    const fruits = [
      { fruitName: 'grapes', count: 4 },
      { fruitName: 'orange', count: 4 },
      { fruitName: 'banana', count: 2 },
      { fruitName: 'strawberries', count: 1 },
    ];
    const barWidths = {
      grapes: '36%',
      orange: '36%',
      banana: '18%',
      strawberries: '9%',
    };
    const chartData = new ChartData(people);
    expect(chartData.parse).toBeDefined();
    const { calcBarWidths, orderedFruits } = chartData.parse();
    expect(calcBarWidths).toBeDefined();
    expect(orderedFruits).toBeDefined();
    expect(calcBarWidths()).toEqual(barWidths);
    expect(orderedFruits.map(({ fruitName, count }) => ({ fruitName, count }))).toEqual(fruits);
  });
});
