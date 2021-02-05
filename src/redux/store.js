import { createStore } from 'redux';
import showsReducer from './showsReducer';

const store = createStore(showsReducer);

export default store;