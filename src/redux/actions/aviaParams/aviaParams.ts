import {
  ActionAviaParamsTypes,
  SET_ACTIVE_INPUT_DATE,
  SET_CABIN_CLASS,
  SET_DEPARTURE_DATE,
  SET_RETURN_DATE,
  SET_PASSANGERS,
} from './types';

export const setActiveInputDate = (
  inputType: string | null
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

export const setCabinClass = (cabinClass: string): ActionAviaParamsTypes => ({
  type: SET_CABIN_CLASS,
  payload: cabinClass,
});

export const setPassangers = (
  value: number,
  name: string
): ActionAviaParamsTypes => ({
  type: SET_PASSANGERS,
  payload: { name, value },
});
