export const SET_ACTIVE_INPUT_DATE = 'SET_ACTIVE_INPUT_DATE';
export const SET_DEPARTURE_DATE = 'SET_DEPARTURE_DATE';
export const SET_RETURN_DATE = 'SET_RETURN_DATE';

export const SET_CABIN_CLASS = 'SET_CABIN_CLASS';
export const SET_PASSANGERS = 'SET_PASSANGERS';

type ActionSetActiveInputDateType = {
  type: typeof SET_ACTIVE_INPUT_DATE;
  payload: string | null;
};

type ActionSetDepartureDateType = {
  type: typeof SET_DEPARTURE_DATE;
  payload: Date | null;
};

type ActionSetReturnDateType = {
  type: typeof SET_RETURN_DATE;
  payload: Date | null;
};

type ActionSetCabinClassType = {
  type: typeof SET_CABIN_CLASS;
  payload: string;
};

type ActionSetPassangersType = {
  type: typeof SET_PASSANGERS;
  payload: { value: number; name: string };
};

export type ActionAviaParamsTypes =
  | ActionSetActiveInputDateType
  | ActionSetDepartureDateType
  | ActionSetReturnDateType
  | ActionSetCabinClassType
  | ActionSetPassangersType;
