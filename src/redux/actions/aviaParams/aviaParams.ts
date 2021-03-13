import {
  ActionAviaParamsTypes,
  SET_ACTIVE_INPUT_DATE,
  SET_DEPARTURE_DATE,
  SET_RETURN_DATE,
} from './types';

// eslint-disable-next-line import/prefer-default-export
export const setActiveInputDate = (
  inputType: string
): ActionAviaParamsTypes => ({
  type: SET_ACTIVE_INPUT_DATE,
  payload: inputType,
});

export const setDepartureDate = (date: Date | null): ActionAviaParamsTypes => ({
  type: SET_DEPARTURE_DATE,
  payload: date,
});

export const setReturnDate = (date: Date | null): ActionAviaParamsTypes => ({
  type: SET_RETURN_DATE,
  payload: date,
});
