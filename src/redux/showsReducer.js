import { LOADSHOWSLIST, LOADCURRENTSHOW, SORTSHOWS } from './action-types';
import { fields, orders } from '../constants/sorting';

const initialState = {
  shows: {
    items: [],
    totalPages: 0
  },
  currentShow: {},
  sorting: {
    order: orders.asc,
    field: fields.name
  }
};

// changes the state here
const showsReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOADSHOWSLIST:
      return {
        ...state,
        shows: action.payload,
      };
    case LOADCURRENTSHOW:
      return {
        ...state,
        currentShow: action.payload
      };
    case SORTSHOWS:
      return {
        ...state,
        sorting: action.payload,
      }
    default:
      return state;
  }
}

export default showsReducer;