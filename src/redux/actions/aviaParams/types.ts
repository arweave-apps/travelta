import {
  CabinClassTypes,
  PassangersNamesTypes,
  Segments,
} from '../../reducers/aviaParams';

export const SET_CABIN_CLASS = 'SET_CABIN_CLASS';
export const SET_PASSANGERS = 'SET_PASSANGERS';
export const SET_SEGMENTS = 'SET_SEGMENTS';

type ActionSetCabinClassType = {
  type: typeof SET_CABIN_CLASS;
  payload: CabinClassTypes;
};

type ActionSetPassangersType = {
  type: typeof SET_PASSANGERS;
  payload: { value: number; name: PassangersNamesTypes };
};

type ActionSetSegmentsType = {
  type: typeof SET_SEGMENTS;
  payload: Segments;
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
  | ActionSetPassangersType
  | ActionSetSegmentsType;
