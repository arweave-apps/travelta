import { combineReducers } from 'redux';

import { settingsReducer } from './settings';
import { aviaParamsReducer } from './aviaParams';
import { pageSettingsReducer } from './pageSettings';
import { locationsReducer } from './locations';
import { ticketsReducer } from './tickets';

export const rootReducer = combineReducers({
  settings: settingsReducer,
  aviaParams: aviaParamsReducer,
  pageSettings: pageSettingsReducer,
  locations: locationsReducer,
  tickets: ticketsReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
