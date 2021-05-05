import {
  CabinClassTypes,
  PassangersNamesTypes,
} from '../../reducers/aviaParams';

export const SET_DATE = 'SET_DATE';

export const SET_CABIN_CLASS = 'SET_CABIN_CLASS';
export const SET_PASSANGERS = 'SET_PASSANGERS';

export const ADD_SEGMENT = 'ADD_SEGMENT';
export const RESET_DATES = 'RESET_DATES';

export const CLEAR_SEGMENTS = 'CLEAR_SEGMENTS';

export const SET_CITY = 'SET_CITY';

export type DateTypeTypes = 'departureDate' | 'returnDate';

export type DatePayloadType = {
  date: Date | null;
  segmentId: string;
  dateType: DateTypeTypes;
};

type ActionSetDateType = {
  type: typeof SET_DATE;
  payload: DatePayloadType;
};

type ActionSetCabinClassType = {
  type: typeof SET_CABIN_CLASS;
  payload: CabinClassTypes;
};

type ActionSetPassangersType = {
  type: typeof SET_PASSANGERS;
  payload: { value: number; name: PassangersNamesTypes };
};

type ActionResetDates = {
  type: typeof RESET_DATES;
  payload: string;
};

type ActionAddSegmentType = {
  type: typeof ADD_SEGMENT;
};

type ActionClearSegmentsType = {
  type: typeof CLEAR_SEGMENTS;
};

export type FieldNameTypes = 'origin' | 'destination';

export type CityPayloadType = {
  name: string;
  code: string;
  segmentId: string;
  fieldName: FieldNameTypes;
};

type ActionSetCityType = {
  type: typeof SET_CITY;
  payload: CityPayloadType;
};

export type ActionAviaParamsTypes =
  | ActionSetDateType
  | ActionSetCabinClassType
  | ActionSetPassangersType
  | ActionAddSegmentType
  | ActionClearSegmentsType
  | ActionSetCityType
  | ActionResetDates;
