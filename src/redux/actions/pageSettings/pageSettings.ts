import {
  ActionPageSettingsTypes,
  SET_ACTIVE_FORM,
  SET_ACTIVE_INPUT_DATE,
  SET_ACTIVE_SEGMENT,
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

export const setActiveSegment = (
  segmentId: string | null
): ActionPageSettingsTypes => ({
  type: SET_ACTIVE_SEGMENT,
  payload: segmentId,
});
