import {
  ActionAviaParamsTypes,
  ADD_SEGMENT,
  CLEAR_SEGMENTS,
  SET_CABIN_CLASS,
  SET_DATE,
  SET_CITY,
  SET_PASSANGERS,
  DateTypeTypes,
  FieldNameTypes,
  RESET_DATES,
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

export type SegmentType = {
  id: string;
  origin: string;
  originCode: string;

  destination: string;
  destinationCode: string;

  departureDate: Date | null;
  returnDate: Date | null;
};

export type PassangersNamesTypes = 'adults' | 'children' | 'infants';
export type CabinClassTypes = 'M' | 'W' | 'C' | 'F';
export type PassangersType = Record<PassangersNamesTypes, number>;

export type InitialAviaParamsStateType = {
  segments: Array<SegmentType>;
  passangers: PassangersType;
  selectedCabins: CabinClassTypes;
};

const updateSegment = (
  state: InitialAviaParamsStateType,
  segmentId: string,
  propName: DateTypeTypes | FieldNameTypes,
  value: string | Date | null,
  subValue?: string
) => {
  const newSegments = state.segments.map((segment) => {
    if (segment.id === segmentId) {
      return subValue
        ? {
            ...segment,
            [propName]: value,
            [`${propName}Code`]: subValue,
          }
        : {
            ...segment,
            [propName]: value,
          };
    }
    return segment;
  });

  return { ...state, segments: newSegments };
};

export const aviaParamsReducer = (
  state: InitialAviaParamsStateType = initialState,
  action: ActionAviaParamsTypes
): InitialAviaParamsStateType => {
  switch (action.type) {
    case SET_DATE: {
      const { date, segmentId, dateType } = action.payload;
      return updateSegment(state, segmentId, dateType, date);
    }
    case SET_CITY: {
      const { name, code, segmentId, fieldName } = action.payload;
      return updateSegment(state, segmentId, fieldName, name, code);
    }
    case SET_CABIN_CLASS:
      return { ...state, selectedCabins: action.payload };
    case SET_PASSANGERS: {
      const { name, value } = action.payload;
      return { ...state, passangers: { ...state.passangers, [name]: value } };
    }
    case ADD_SEGMENT: {
      const newSegments = [
        ...state.segments,
        {
          id: `segment-${state.segments.length + 1}`,
          origin: '',
          originCode: '',
          destination: '',
          destinationCode: '',
          departureDate: null,
          returnDate: null,
        },
      ];
      return { ...state, segments: newSegments };
    }
    case RESET_DATES: {
      const segmentId = action.payload;
      const newSegments = state.segments.map((segment) => {
        if (segment.id !== segmentId) {
          return {
            ...segment,
            departureDate: null,
          };
        }
        return segment;
      });

      return { ...state, segments: newSegments };
    }
    case CLEAR_SEGMENTS: {
      return { ...initialState };
    }

    default:
      return state;
  }
};
