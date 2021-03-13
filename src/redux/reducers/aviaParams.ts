import {
  ActionAviaParamsTypes,
  SET_ACTIVE_INPUT_DATE,
} from '../actions/aviaParams/types';

const initialState = {
  activeInputDate: null,
  departureDate: null,
  returnDate: null,
};

export type InitialAviaParamsStateType = {
  activeInputDate: null | string;
  departureDate: null | string;
  returnDate: null | string;
};

export const aviaParamsReducer = (
  state: InitialAviaParamsStateType = initialState,
  action: ActionAviaParamsTypes
): InitialAviaParamsStateType => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case SET_ACTIVE_INPUT_DATE:
      return { ...state, activeInputDate: action.payload };

    default:
      return state;
  }
};
