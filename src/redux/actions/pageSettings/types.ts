export const SET_ACTIVE_FORM = 'SET_ACTIVE_FORM';
export const SET_ACTIVE_INPUT_DATE = 'SET_ACTIVE_INPUT_DATE';
export const SET_ACTIVE_SEGMENT = 'SET_ACTIVE_SEGMENT';

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

export type ActionPageSettingsTypes =
  | ActionSetACtiveFormType
  | ActionSetActiveInputDateType
  | ActionSetActiveSegmentType;
