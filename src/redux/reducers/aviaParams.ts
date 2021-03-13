import {
  ActionAviaParamsTypes,
  SET_ACTIVE_INPUT_DATE,
  SET_DEPARTURE_DATE,
  SET_RETURN_DATE,
} from '../actions/aviaParams/types';

const initialState = {
  activeInputDate: null,
  departureDate: null,
  returnDate: null,
};

export type InitialAviaParamsStateType = {
  activeInputDate: null | string;
  departureDate: Date | null;
  returnDate: Date | null;
};

export const aviaParamsReducer = (
  state: InitialAviaParamsStateType = initialState,
  action: ActionAviaParamsTypes
): InitialAviaParamsStateType => {
  switch (action.type) {
    case SET_ACTIVE_INPUT_DATE:
      return { ...state, activeInputDate: action.payload };
    case SET_DEPARTURE_DATE:
      return { ...state, departureDate: action.payload };
    case SET_RETURN_DATE:
      return { ...state, returnDate: action.payload };

    default:
      return state;
  }
};
