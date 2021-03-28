import {
  ActionPageSettingsTypes,
  SET_ACTIVE_FORM,
  SET_ACTIVE_INPUT_DATE,
} from './types';

export const setActiveForm = (activeForm: string): ActionPageSettingsTypes => ({
  type: SET_ACTIVE_FORM,
  payload: activeForm,
});

export const setActiveInputDate = (
  inputType: string | null
): ActionPageSettingsTypes => ({
  type: SET_ACTIVE_INPUT_DATE,
  payload: inputType,
});
