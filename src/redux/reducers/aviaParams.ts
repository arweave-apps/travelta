import {
  ActionAviaParamsTypes,
  SET_ACTIVE_INPUT_DATE,
  SET_CABIN_CLASS,
  SET_DEPARTURE_DATE,
  SET_PASSANGERS,
  SET_RETURN_DATE,
} from '../actions/aviaParams/types';

const initialState = {
  activeInputDate: null,
  departureDate: null,
  returnDate: null,
  passangers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  // M (economy), W (economy premium), C (business), or F (first class)
  selectedCabins: 'M',
};

export type PassangersType = {
  [key: string]: number;
  adults: number;
  children: number;
  infants: number;
};

export type InitialAviaParamsStateType = {
  activeInputDate: null | string;
  departureDate: Date | null;
  returnDate: Date | null;
  passangers: PassangersType;
  selectedCabins: string;
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
    case SET_CABIN_CLASS:
      return { ...state, selectedCabins: action.payload };
    case SET_PASSANGERS: {
      const { name, value } = action.payload;
      return { ...state, passangers: { ...state.passangers, [name]: value } };
    }

    default:
      return state;
  }
};
