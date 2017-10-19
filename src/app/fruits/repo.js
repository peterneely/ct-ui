import api from '_api';

export function getPeople() {
  return new Promise(resolve => {
    api.get(people => resolve(people));
  });
}
