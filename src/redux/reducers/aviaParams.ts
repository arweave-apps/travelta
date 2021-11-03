import {
  ActionAviaParamsTypes,
  SET_CABIN_CLASS,
  SET_PASSANGERS,
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
