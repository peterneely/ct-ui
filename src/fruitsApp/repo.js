import api from '../fruitsApi/api';

export function getPeople() {
  return new Promise(resolve => {
    api.get(people => resolve(people));
  });
}
