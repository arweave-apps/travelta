export const SET_ACTIVE_FORM = 'SET_ACTIVE_FORM';
export const SET_ACTIVE_INPUT_DATE = 'SET_ACTIVE_INPUT_DATE';
export const SET_ACTIVE_SEGMENT = 'SET_ACTIVE_SEGMENT';

export const SET_BEFORE_DISABLED_DATES = 'SET_BEFORE_DISABLED_DATES';
export const SET_AFTER_DISABLED_DATES = 'SET_AFTER_DISABLED_DATES';

type ActionSetACtiveFormType = {
  type: typeof SET_ACTIVE_FORM;
  payload: string;
};

type ActionSetActiveInputDateType = {
  type: typeof SET_ACTIVE_INPUT_DATE;
  payload: string | null;
};

type ActionSetActiveSegmentType = {
  type: typeof SET_ACTIVE_SEGMENT;
  payload: string | null;
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
  | ActionSetACtiveFormType
  | ActionSetActiveInputDateType
  | ActionSetActiveSegmentType
  | ActionSetBeforeDisabledDatesType
  | ActionSetAfterDisabledDatesType;
