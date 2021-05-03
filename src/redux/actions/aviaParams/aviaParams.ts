import {
  CabinClassTypes,
  PassangersNamesTypes,
} from '../../reducers/aviaParams';
import {
  ActionAviaParamsTypes,
  SET_CABIN_CLASS,
  SET_DATE,
  SET_PASSANGERS,
  ADD_SEGMENT,
  CLEAR_SEGMENTS,
  SET_CITY,
  FieldNameTypes,
  DateTypeTypes,
} from './types';

export const setDate = (
  date: Date | null,
  segmentId: string,
  dateType: DateTypeTypes
): ActionAviaParamsTypes => ({
  type: SET_DATE,
  payload: { date, segmentId, dateType },
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

export const setCity = (
  name: string,
  code: string,
  segmentId: string,
  fieldName: FieldNameTypes
): ActionAviaParamsTypes => ({
  type: SET_CITY,
  payload: { name, code, segmentId, fieldName },
});
