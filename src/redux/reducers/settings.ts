import { ActionSettingsTypes, SET_CURRENCY } from '../actions/settings/types';

const initialState = {
  currency: 'RUB',
};

export type InitialSettingsStateType = typeof initialState;

export const settingsReducer = (
  state: InitialSettingsStateType = initialState,
  action: ActionSettingsTypes
): InitialSettingsStateType => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case SET_CURRENCY:
      return { ...state, currency: action.payload };

    default:
      return state;
  }
};
