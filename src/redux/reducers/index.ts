import { combineReducers } from 'redux';

import { settingsReducer } from './settings';

export const rootReducer = combineReducers({
  settings: settingsReducer,
  // users: userReducer,
  // here you can add the rest of the reducers
});

export type RootStateType = ReturnType<typeof rootReducer>;
