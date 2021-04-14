import {
  ActionAviaParamsTypes,
  ADD_SEGMENT,
  CLEAR_SEGMENTS,
  SET_CABIN_CLASS,
  SET_DEPARTURE_DATE,
  SET_DESTINATION,
  SET_ORIGIN,
  SET_PASSANGERS,
  SET_RETURN_DATE,
} from '../actions/aviaParams/types';

const initialState = {
  segments: [
    {
      id: 'segment-1',
      origin: '',
      destination: '',
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
  destination: string;
  departureDate: Date | null;
  returnDate: Date | null;
};

export type PassangersType = {
  [key: string]: number;
  adults: number;
  children: number;
  infants: number;
};

export type InitialAviaParamsStateType = {
  segments: Array<SegmentType>;
  passangers: PassangersType;
  selectedCabins: string;
};

export const aviaParamsReducer = (
  state: InitialAviaParamsStateType = initialState,
  action: ActionAviaParamsTypes
): InitialAviaParamsStateType => {
  switch (action.type) {
    case SET_DEPARTURE_DATE: {
      const { date, segmentId } = action.payload;
      const newSegments = state.segments.map((segment) => {
        if (segment.id === segmentId) {
          return {
            ...segment,
            departureDate: date,
          };
        }
        return segment;
      });

      return { ...state, segments: newSegments };
    }
    case SET_RETURN_DATE: {
      const { date, segmentId } = action.payload;
      const newSegments = state.segments.map((segment) => {
        if (segment.id === segmentId) {
          return {
            ...segment,
            returnDate: date,
          };
        }
        return segment;
      });

      return { ...state, segments: newSegments };
    }
    case SET_ORIGIN: {
      const { value, segmentId } = action.payload;
      const newSegments = state.segments.map((segment) => {
        if (segment.id === segmentId) {
          return {
            ...segment,
            origin: value,
          };
        }
        return segment;
      });

      return { ...state, segments: newSegments };
    }
    case SET_DESTINATION: {
      const { value, segmentId } = action.payload;
      const newSegments = state.segments.map((segment) => {
        if (segment.id === segmentId) {
          return {
            ...segment,
            destination: value,
          };
        }
        return segment;
      });

      return { ...state, segments: newSegments };
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
          destination: '',
          departureDate: null,
          returnDate: null,
        },
      ];
      return { ...state, segments: newSegments };
    }
    case CLEAR_SEGMENTS: {
      return { ...initialState };
    }

    default:
      return state;
  }
};
