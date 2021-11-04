import {
  CabinClassTypes,
  PassengersNamesTypes,
  FormSegments,
} from '../../reducers/aviaParams';

export const SET_CABIN_CLASS = 'SET_CABIN_CLASS';
export const SET_PASSENGERS = 'SET_PASSENGERS';
export const SET_FORM_SEGMENTS = 'SET_FORM_SEGMENTS';

type ActionSetCabinClassType = {
  type: typeof SET_CABIN_CLASS;
  payload: CabinClassTypes;
};

type ActionSetPassengersType = {
  type: typeof SET_PASSENGERS;
  payload: { value: number; name: PassengersNamesTypes };
};

type ActionSetFormSegmentsType = {
  type: typeof SET_FORM_SEGMENTS;
  payload: FormSegments;
};

export type FieldNameTypes = 'origin' | 'destination';

export type CityPayloadType = {
  name: string;
  code: string;
  segmentId: string;
  fieldName: FieldNameTypes;
};

export type ActionAviaParamsTypes =
  | ActionSetCabinClassType
  | ActionSetPassengersType
  | ActionSetFormSegmentsType;
