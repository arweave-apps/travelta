import {
  ActionPageSettingsTypes,
  SET_ACTIVE_FORM,
  SET_ACTIVE_INPUT_DATE,
} from '../actions/pageSettings/types';

const initialState = {
  activeForm: 'standart',
  activeInputDate: null,
};

export type InitialPageSettingsStateType = {
  activeForm: string;
  activeInputDate: null | string;
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

    default:
      return state;
  }
};
