import {
  ActionPageSettingsTypes,
  SET_ACTIVE_FORM,
  SET_ACTIVE_INPUT_DATE,
  SET_ACTIVE_SEGMENT,
} from '../actions/pageSettings/types';

const initialState = {
  activeForm: 'standart',
  activeInputDate: null,
  activeSegment: null,
};

export type InitialPageSettingsStateType = {
  activeForm: string;
  activeInputDate: null | string;
  activeSegment: null | string;
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

    default:
      return state;
  }
};
