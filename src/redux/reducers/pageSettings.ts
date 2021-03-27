/* eslint-disable sonarjs/no-small-switch */
import {
  ActionPageSettingsTypes,
  SET_ACTIVE_FORM,
} from '../actions/pageSettings/types';

const initialState = {
  activeForm: 'multiCity',
};

export type InitialPageSettingsStateType = typeof initialState;

export const pageSettingsReducer = (
  state: InitialPageSettingsStateType = initialState,
  action: ActionPageSettingsTypes
): InitialPageSettingsStateType => {
  switch (action.type) {
    case SET_ACTIVE_FORM:
      return { ...state, activeForm: action.payload };

    default:
      return state;
  }
};
