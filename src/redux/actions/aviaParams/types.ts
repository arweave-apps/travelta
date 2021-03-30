export const SET_DEPARTURE_DATE = 'SET_DEPARTURE_DATE';
export const SET_RETURN_DATE = 'SET_RETURN_DATE';

export const SET_CABIN_CLASS = 'SET_CABIN_CLASS';
export const SET_PASSANGERS = 'SET_PASSANGERS';

export const ADD_SEGMENT = 'ADD_SEGMENT';
export const CLEAR_SEGMENTS = 'CLEAR_SEGMENTS';

type PayloadType = {
  date: Date | null;
  segmentId: string;
};
type ActionSetDepartureDateType = {
  type: typeof SET_DEPARTURE_DATE;
  payload: PayloadType;
};

type ActionSetReturnDateType = {
  type: typeof SET_RETURN_DATE;
  payload: PayloadType;
};

type ActionSetCabinClassType = {
  type: typeof SET_CABIN_CLASS;
  payload: string;
};

type ActionSetPassangersType = {
  type: typeof SET_PASSANGERS;
  payload: { value: number; name: string };
};

type ActionAddSegmentType = {
  type: typeof ADD_SEGMENT;
};

type ActionClearSegmentsType = {
  type: typeof CLEAR_SEGMENTS;
};

export type ActionAviaParamsTypes =
  | ActionSetDepartureDateType
  | ActionSetReturnDateType
  | ActionSetCabinClassType
  | ActionSetPassangersType
  | ActionAddSegmentType
  | ActionClearSegmentsType;
