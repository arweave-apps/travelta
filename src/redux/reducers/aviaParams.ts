import {
  ActionAviaParamsTypes,
  SET_CABIN_CLASS,
  SET_PASSENGERS,
  SET_FORM_SEGMENTS,
} from '../actions/aviaParams/types';

const initialState: InitialAviaParamsStateType = {
  formSegments: [
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
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  // M (economy), W (economy premium), C (business), or F (first class)
  selectedCabins: 'M',
};

export type PassengersNamesTypes = 'adults' | 'children' | 'infants';
export type CabinClassTypes = 'M' | 'W' | 'C' | 'F';
export type PassengersType = Record<PassengersNamesTypes, number>;

// export type SegmentRoundtripId = 'segment-roundtrip';
export type FormSegmentId =
  | 'segment-1'
  | 'segment-2'
  | 'segment-3'
  | 'segment-4'
  | 'segment-5'
  | 'segment-6';
// | SegmentRoundtripId;
type FormOriginCity = string;
type FormOriginCityCode = string;
type FormDestinationCity = string;
type FormDestinationCityCode = string;

export type FormSegment = {
  id: FormSegmentId;
  origin: FormOriginCity;
  originCode: FormOriginCityCode;

  destination: FormDestinationCity;
  destinationCode: FormDestinationCityCode;

  departureDate: Date | null;
  returnDate: Date | null;
};

export type FormSegments = FormSegment[];

export type InitialAviaParamsStateType = {
  formSegments: FormSegments;
  passengers: PassengersType;
  selectedCabins: CabinClassTypes;
};

export const aviaParamsReducer = (
  state: InitialAviaParamsStateType = initialState,
  action: ActionAviaParamsTypes
): InitialAviaParamsStateType => {
  switch (action.type) {
    case SET_CABIN_CLASS:
      return { ...state, selectedCabins: action.payload };

    case SET_PASSENGERS: {
      const { name, value } = action.payload;
      return { ...state, passengers: { ...state.passengers, [name]: value } };
    }

    case SET_FORM_SEGMENTS: {
      return {
        ...state,
        formSegments: action.payload,
      };
    }

    default:
      return state;
  }
};
