import { ActionSettingsTypes, SET_CURRENCY } from '../actions/settings/types';

export type CurrencyType = 'RUB' | 'USD' | 'EUR';

const initialState: InitialSettingsStateType = {
  currency: 'RUB',
};

export type InitialSettingsStateType = {
  currency: CurrencyType;
};

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
