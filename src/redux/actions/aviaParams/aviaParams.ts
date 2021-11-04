import {
  CabinClassTypes,
  PassengersNamesTypes,
  FormSegments,
} from '../../reducers/aviaParams';
import {
  ActionAviaParamsTypes,
  SET_CABIN_CLASS,
  SET_PASSENGERS,
  SET_FORM_SEGMENTS,
} from './types';

export const setCabinClass = (
  cabinClass: CabinClassTypes
): ActionAviaParamsTypes => ({
  type: SET_CABIN_CLASS,
  payload: cabinClass,
});

export const setPassengers = (
  value: number,
  name: PassengersNamesTypes
): ActionAviaParamsTypes => ({
  type: SET_PASSENGERS,
  payload: { name, value },
});

export const setFormSegments = (
  formSegments: FormSegments
): ActionAviaParamsTypes => ({
  type: SET_FORM_SEGMENTS,
  payload: formSegments,
});
