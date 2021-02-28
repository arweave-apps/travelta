import { DECREMENT, INCREMENT, ActionCounterTypes } from './types';

export const decrement = (): ActionCounterTypes => ({
  type: DECREMENT,
});

export const increment = (): ActionCounterTypes => ({
  type: INCREMENT,
});
