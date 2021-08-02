import {
  CabinClassTypes,
  PassangersNamesTypes,
} from '../../reducers/aviaParams';
import {
  ActionAviaParamsTypes,
  SET_CABIN_CLASS,
  SET_PASSANGERS,
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
