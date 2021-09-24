import {
  CabinClassTypes,
  PassangersNamesTypes,
  Segments,
} from '../../reducers/aviaParams';
import {
  ActionAviaParamsTypes,
  SET_CABIN_CLASS,
  SET_PASSANGERS,
  SET_SEGMENTS,
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

export const setSegments = (segments: Segments): ActionAviaParamsTypes => ({
  type: SET_SEGMENTS,
  payload: segments,
});
