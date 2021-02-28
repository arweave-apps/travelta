import {
  DECREMENT,
  INCREMENT,
  ActionCounterTypes,
} from '../actions/counter/types';

const initialState = {
  value: 0,
};

export type InitialCounterStateType = typeof initialState;

export const counterReducer = (
  state: InitialCounterStateType = initialState,
  action: ActionCounterTypes
): InitialCounterStateType => {
  switch (action.type) {
    case DECREMENT:
      return { ...state, value: state.value - 1 };
    case INCREMENT:
      return { ...state, value: state.value + 1 };

    default:
      return state;
  }
};
