import {
  CabinClassTypes,
  PassangersNamesTypes,
  FormSegments,
} from '../../reducers/aviaParams';
import {
  ActionAviaParamsTypes,
  SET_CABIN_CLASS,
  SET_PASSANGERS,
  SET_FORM_SEGMENTS,
} from './types';

export const setCabinClass = (
  cabinClass: CabinClassTypes
): ActionAviaParamsTypes => ({
  type: SET_CABIN_CLASS,
  payload: cabinClass,
});

export const setPassangers = (
  value: number,
  name: PassangersNamesTypes
): ActionAviaParamsTypes => ({
  type: SET_PASSANGERS,
  payload: { name, value },
});

export const setFormSegments = (
  formSegments: FormSegments
): ActionAviaParamsTypes => ({
  type: SET_FORM_SEGMENTS,
  payload: formSegments,
});
