import { combineReducers } from 'redux';
import todos from './todos';
import filters from './filters';

export default combineReducers({
  todoReducer: todos,
  filterReducer: filters,
});
