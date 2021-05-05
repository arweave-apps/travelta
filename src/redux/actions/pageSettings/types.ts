import { ActiveInputType, FormsType } from '../../reducers/pageSettings';

export const SET_ACTIVE_FORM = 'SET_ACTIVE_FORM';
export const SET_ACTIVE_INPUT_DATE = 'SET_ACTIVE_INPUT_DATE';
export const SET_ACTIVE_SEGMENT_ID = 'SET_ACTIVE_SEGMENT_ID';

export const SET_BEFORE_DISABLED_DATES = 'SET_BEFORE_DISABLED_DATES';
export const SET_AFTER_DISABLED_DATES = 'SET_AFTER_DISABLED_DATES';

type ActionSetAсtiveFormType = {
  type: typeof SET_ACTIVE_FORM;
  payload: FormsType;
};

type ActionSetActiveInputDateType = {
  type: typeof SET_ACTIVE_INPUT_DATE;
  payload: ActiveInputType;
};

type ActionSetActiveSegmentIdType = {
  type: typeof SET_ACTIVE_SEGMENT_ID;
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
  | ActionSetAсtiveFormType
  | ActionSetActiveInputDateType
  | ActionSetActiveSegmentIdType
  | ActionSetBeforeDisabledDatesType
  | ActionSetAfterDisabledDatesType;
