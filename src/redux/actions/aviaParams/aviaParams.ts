import { ActionAviaParamsTypes, SET_ACTIVE_INPUT_DATE } from './types';

// eslint-disable-next-line import/prefer-default-export
export const setActiveInputDate = (
  inputType: string
): ActionAviaParamsTypes => ({
  type: SET_ACTIVE_INPUT_DATE,
  payload: inputType,
});
