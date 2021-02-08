import Sorting from '../constants/sorting';

function compareStr (a, b, order) {
  // TODO:
  // refactor this in order to reduce nested ifs
  if (order === Sorting.orders.asc) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
  }

  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  
  return 0;
}

function compareNum (a, b, order) {
  if (order === Sorting.orders.desc) return a - b;
  // asc by default
  return b -a;
}

export const sortItems = (list, criteria) => {
  const newList = [ ...list ];
  const { field, order } = criteria;
  
  newList.sort((a, b) => {
    // only supports string and number
    const type = typeof field;
    if (type === 'number') return compareNum(a[field], b[field], order);
    return compareStr(a[field], b[field], order);
  });

  return newList;
};