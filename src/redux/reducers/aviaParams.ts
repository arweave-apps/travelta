import {
  ActionAviaParamsTypes,
  SET_CABIN_CLASS,
  SET_PASSANGERS,
} from '../actions/aviaParams/types';

const initialState: InitialAviaParamsStateType = {
  passangers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  // M (economy), W (economy premium), C (business), or F (first class)
  selectedCabins: 'M',
};

export type PassangersNamesTypes = 'adults' | 'children' | 'infants';
export type CabinClassTypes = 'M' | 'W' | 'C' | 'F';
export type PassangersType = Record<PassangersNamesTypes, number>;

export type InitialAviaParamsStateType = {
  passangers: PassangersType;
  selectedCabins: CabinClassTypes;
};

export const aviaParamsReducer = (
  state: InitialAviaParamsStateType = initialState,
  action: ActionAviaParamsTypes
): InitialAviaParamsStateType => {
  switch (action.type) {
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
