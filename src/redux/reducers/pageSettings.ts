import {
  ActionPageSettingsTypes,
  SET_ACTIVE_FORM,
  SET_ACTIVE_INPUT_DATE,
  SET_ACTIVE_SEGMENT,
  SET_AFTER_DISABLED_DATES,
  SET_BEFORE_DISABLED_DATES,
} from '../actions/pageSettings/types';

const initialState: InitialPageSettingsStateType = {
  activeForm: 'roundtrip',
  activeInputDate: null,
  activeSegment: null,
  disabledDates: {
    after: null,
    before: null,
  },
};

export type DisabledDatesType = {
  after: Date | null;
  before: Date | null;
};

export type FormsType = 'multiCity' | 'oneWay' | 'roundtrip';

export type InitialPageSettingsStateType = {
  activeForm: FormsType;
  activeInputDate: null | string;
  activeSegment: null | string;
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
    case SET_ACTIVE_SEGMENT:
      return { ...state, activeSegment: action.payload };
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
