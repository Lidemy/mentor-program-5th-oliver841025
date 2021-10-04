import { ADD_TODO, DELETE_ALL, DELETE_TODO, TOGGLE_TODO } from '../actionTypes';

let todoId = 0;

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      return {
        todos: [
          ...state.todos,
          {
            name: action.payload.content,
            id: todoId++,
            isDone: false,
          },
        ],
      };
    }
    case DELETE_TODO: {
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }
    case DELETE_ALL: {
      return {
        todos: [],
      };
    }

    case TOGGLE_TODO: {
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          }
          return todo;
        }),
      };
    }

    default: {
      return state;
    }
  }
};

export default todoReducer;
