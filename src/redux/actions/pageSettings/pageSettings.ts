/* eslint-disable import/prefer-default-export */
import { ActionPageSettingsTypes, SET_ACTIVE_FORM } from './types';

export const setActiveForm = (activeForm: string): ActionPageSettingsTypes => ({
  type: SET_ACTIVE_FORM,
  payload: activeForm,
});
