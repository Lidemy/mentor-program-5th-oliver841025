import {
  ADD_TODO,
  DELETE_ALL,
  DELETE_TODO,
  TOGGLE_TODO,
  SET_FILTER,
} from '../actionTypes';

// Action creator
export const addTodo = (todo) => {
  // Return an action
  return {
    type: ADD_TODO,
    payload: {
      content: todo,
    },
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
};

export const deleteAll = () => {
  return {
    type: DELETE_ALL,
  };
};

export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    },
  };
};

export const setFilter = (filter) => {
  return {
    type: SET_FILTER,
    payload: {
      filter,
    },
  };
};
