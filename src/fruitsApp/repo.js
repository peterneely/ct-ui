import api from '../fruitsApi/api';

export function getFruits() {
  return new Promise(resolve => {
    api.get(fruits => resolve(fruits));
  });
}
