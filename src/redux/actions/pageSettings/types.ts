import { FormsType } from '../../reducers/pageSettings';

export const SET_ACTIVE_FORM = 'SET_ACTIVE_FORM';

export const SET_BEFORE_DISABLED_DATES = 'SET_BEFORE_DISABLED_DATES';
export const SET_AFTER_DISABLED_DATES = 'SET_AFTER_DISABLED_DATES';

type ActionSetActiveFormType = {
  type: typeof SET_ACTIVE_FORM;
  payload: FormsType;
};

type ActionSetBeforeDisabledDatesType = {
  type: typeof SET_BEFORE_DISABLED_DATES;
  payload: Date | null;
};

type ActionSetAfterDisabledDatesType = {
  type: typeof SET_AFTER_DISABLED_DATES;
  payload: Date | null;
};

export type ActionPageSettingsTypes =
  | ActionSetActiveFormType
  | ActionSetBeforeDisabledDatesType
  | ActionSetAfterDisabledDatesType;
