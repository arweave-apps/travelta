import {
  ActionPageSettingsTypes,
  SET_ACTIVE_FORM,
  SET_ACTIVE_INPUT_DATE,
  SET_ACTIVE_SEGMENT,
  SET_AFTER_DISABLED_DATES,
  SET_BEFORE_DISABLED_DATES,
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

export const setBeforeDisabledDates = (
  beforeDate: Date | null
): ActionPageSettingsTypes => ({
  type: SET_BEFORE_DISABLED_DATES,
  payload: beforeDate,
});

export const setAfterDisabledDates = (
  afterDate: Date | null
): ActionPageSettingsTypes => ({
  type: SET_AFTER_DISABLED_DATES,
  payload: afterDate,
});
