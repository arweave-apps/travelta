export const SET_ACTIVE_INPUT_DATE = 'SET_ACTIVE_INPUT_DATE';
export const SET_DEPARTURE_DATE = 'SET_DEPARTURE_DATE';
export const SET_RETURN_DATE = 'SET_RETURN_DATE';

type ActionSetActiveInputDateType = {
  type: typeof SET_ACTIVE_INPUT_DATE;
  payload: string;
};

type ActionSetDepartureDateType = {
  type: typeof SET_DEPARTURE_DATE;
  payload: Date | null;
};

type ActionSetReturnDateType = {
  type: typeof SET_RETURN_DATE;
  payload: Date | null;
};

export type ActionAviaParamsTypes =
  | ActionSetActiveInputDateType
  | ActionSetDepartureDateType
  | ActionSetReturnDateType;
