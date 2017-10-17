/* eslint-disable no-undef */
export function getFruits() {
  return new Promise(resolve => {
    FruitasticApi.get(json => resolve(json)); // FruitasticApi is loaded into the global scope in index.js
  });
}
