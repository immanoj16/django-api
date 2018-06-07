import { ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from '../actions/types';

const initialState = {
  expenses: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.expense]
      };
    case UPDATE_EXPENSE:
      return state;
    case DELETE_EXPENSE:
      return state;
    default:
      return state;
  }
}
