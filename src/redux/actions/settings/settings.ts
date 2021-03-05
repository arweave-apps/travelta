import { SET_CURRENCY, ActionSettingsTypes } from './types';

// eslint-disable-next-line import/prefer-default-export
export const setCurrency = (currency: string): ActionSettingsTypes => ({
  type: SET_CURRENCY,
  payload: currency,
});
