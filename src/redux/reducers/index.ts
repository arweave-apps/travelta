import { combineReducers } from 'redux';

import { settingsReducer } from './settings';
import { aviaParamsReducer } from './aviaParams';
import { pageSettingsReducer } from './pageSettings';

export const rootReducer = combineReducers({
  settings: settingsReducer,
  aviaParams: aviaParamsReducer,
  pageSettings: pageSettingsReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
