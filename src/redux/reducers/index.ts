import { combineReducers } from 'redux';

import { counterReducer } from './counter';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  counter: counterReducer,
  users: userReducer,
  // here you can add the rest of the reducers
});

export type RootStateType = ReturnType<typeof rootReducer>;
