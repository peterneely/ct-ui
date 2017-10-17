import ChartData from './ChartData';

describe('ChartData', () => {

  it('can parse fruits correctly', () => {
    const fruits = [];
    const chartData = new ChartData(fruits);
    // const { calcBarWidths, orderedFruits } = new ChartData(fruits).parseData();
    expect(chartData.parseData).toBeDefined();
  });
});
