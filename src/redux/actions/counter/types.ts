export const DECREMENT = 'DECREMENT';
export const INCREMENT = 'INCREMENT';

type ActionDecrementType = { type: typeof DECREMENT };
type ActionIncrementType = { type: typeof INCREMENT };

export type ActionCounterTypes = ActionDecrementType | ActionIncrementType;
