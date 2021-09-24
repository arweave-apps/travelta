import {
  ActionAviaParamsTypes,
  SET_CABIN_CLASS,
  SET_PASSANGERS,
  SET_SEGMENTS,
} from '../actions/aviaParams/types';

const initialState: InitialAviaParamsStateType = {
  segments: [
    {
      id: 'segment-1',
      origin: '',
      originCode: '',

      destination: '',
      destinationCode: '',

      departureDate: null,
      returnDate: null,
    },
  ],
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

type SegemntId = string;
type OriginCity = string;
type OriginCityCode = string;
type DestinationCity = string;
type DestinationCityCode = string;

export type Segment = {
  id: SegemntId;
  origin: OriginCity;
  originCode: OriginCityCode;

  destination: DestinationCity;
  destinationCode: DestinationCityCode;

  departureDate: Date | null;
  returnDate: Date | null;
};

export type Segments = Segment[];

export type InitialAviaParamsStateType = {
  segments: Segments;
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

    case SET_SEGMENTS: {
      return {
        ...state,
        segments: action.payload,
      };
    }

    default:
      return state;
  }
};
