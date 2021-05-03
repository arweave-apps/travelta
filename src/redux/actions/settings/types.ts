import { CurrencyType } from '../../reducers/settings';

export const SET_CURRENCY = 'SET_CURRENCY';

type ActionSetCurrencyType = {
  type: typeof SET_CURRENCY;
  payload: CurrencyType;
};

export type ActionSettingsTypes = ActionSetCurrencyType;
