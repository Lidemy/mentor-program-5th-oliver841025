import { SET_FILTER } from '../actionTypes';

const initialState = {
  filter: { name: 'all' },
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER: {
      return {
        filter: { name: action.payload.filter },
      };
    }
    default: {
      return state;
    }
  }
};

export default filterReducer;
