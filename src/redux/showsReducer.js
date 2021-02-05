import { LOADSHOWSLIST, LOADCURRENTSHOW } from './action-types';

const initialState = {
  showsList: [],
  currentShow: null,
};

// changes the state here
const showsReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOADSHOWSLIST:
      return {
        ...state,
        showsList: action.payload,
      };
    case LOADCURRENTSHOW:
      return {
        ...state,
        currentShow: action.payload
      };
    default:
      return state;
  }
}

export default showsReducer;