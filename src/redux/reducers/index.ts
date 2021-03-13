import { combineReducers } from 'redux';

import { settingsReducer } from './settings';
import { aviaParamsReducer } from './aviaParams';

export const rootReducer = combineReducers({
  settings: settingsReducer,
  aviaParams: aviaParamsReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
