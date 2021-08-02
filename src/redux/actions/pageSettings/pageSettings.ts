import { FormsType } from '../../reducers/pageSettings';
import {
  ActionPageSettingsTypes,
  SET_ACTIVE_FORM,
  SET_AFTER_DISABLED_DATES,
  SET_BEFORE_DISABLED_DATES,
} from './types';

export const setActiveForm = (
  activeForm: FormsType
): ActionPageSettingsTypes => ({
  type: SET_ACTIVE_FORM,
  payload: activeForm,
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
