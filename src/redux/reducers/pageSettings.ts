import {
  ActionPageSettingsTypes,
  SET_ACTIVE_FORM,
  SET_ACTIVE_INPUT_DATE,
  SET_ACTIVE_SEGMENT_ID,
  SET_AFTER_DISABLED_DATES,
  SET_BEFORE_DISABLED_DATES,
} from '../actions/pageSettings/types';

const initialState: InitialPageSettingsStateType = {
  activeForm: 'roundtrip',
  activeInputDate: null, // delete
  activeSegmentId: null,
  disabledDates: {
    before: null,
    after: null,
  },
};

export type DisabledDatesType = {
  before: Date | null;
  after: Date | null;
};

export type FormsType = 'multiCity' | 'oneWay' | 'roundtrip';
export type ActiveInputType = 'departure' | 'return' | null;

export type InitialPageSettingsStateType = {
  activeForm: FormsType;
  activeInputDate: ActiveInputType;
  activeSegmentId: null | string;
  disabledDates: DisabledDatesType;
};

export const pageSettingsReducer = (
  state: InitialPageSettingsStateType = initialState,
  action: ActionPageSettingsTypes
): InitialPageSettingsStateType => {
  switch (action.type) {
    case SET_ACTIVE_FORM:
      return { ...state, activeForm: action.payload };
    case SET_ACTIVE_INPUT_DATE:
      return { ...state, activeInputDate: action.payload };
    case SET_ACTIVE_SEGMENT_ID:
      return { ...state, activeSegmentId: action.payload };
    case SET_BEFORE_DISABLED_DATES:
      return {
        ...state,
        disabledDates: { ...state.disabledDates, before: action.payload },
      };
    case SET_AFTER_DISABLED_DATES:
      return {
        ...state,
        disabledDates: { ...state.disabledDates, after: action.payload },
      };

    default:
      return state;
  }
};
