import {
  CabinClassTypes,
  PassangersNamesTypes,
} from '../../reducers/aviaParams';
import {
  ActionAviaParamsTypes,
  SET_CABIN_CLASS,
  SET_DEPARTURE_DATE,
  SET_RETURN_DATE,
  SET_PASSANGERS,
  ADD_SEGMENT,
  CLEAR_SEGMENTS,
  SET_ORIGIN,
  SET_DESTINATION,
} from './types';

export const setDepartureDate = (
  date: Date | null,
  segmentId: string
): ActionAviaParamsTypes => ({
  type: SET_DEPARTURE_DATE,
  payload: { date, segmentId },
});

export const setReturnDate = (
  date: Date | null,
  segmentId: string
): ActionAviaParamsTypes => ({
  type: SET_RETURN_DATE,
  payload: { date, segmentId },
});

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

export const addSegment = (): ActionAviaParamsTypes => ({
  type: ADD_SEGMENT,
});

export const clearSegments = (): ActionAviaParamsTypes => ({
  type: CLEAR_SEGMENTS,
});

export const setOrigin = (
  name: string,
  code: string,
  segmentId: string
): ActionAviaParamsTypes => ({
  type: SET_ORIGIN,
  payload: { name, code, segmentId },
});

export const setDestination = (
  name: string,
  code: string,
  segmentId: string
): ActionAviaParamsTypes => ({
  type: SET_DESTINATION,
  payload: { name, code, segmentId },
});
