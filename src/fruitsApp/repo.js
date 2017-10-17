export function getFruits() {
  return new Promise(resolve => {
    FruitasticApi.get(json => resolve(json));
  });
}
