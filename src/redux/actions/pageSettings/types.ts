export const SET_ACTIVE_FORM = 'SET_ACTIVE_FORM';
export const SET_ACTIVE_INPUT_DATE = 'SET_ACTIVE_INPUT_DATE';

type ActionSetACtiveFormType = {
  type: typeof SET_ACTIVE_FORM;
  payload: string;
};

type ActionSetActiveInputDateType = {
  type: typeof SET_ACTIVE_INPUT_DATE;
  payload: string | null;
};

export type ActionPageSettingsTypes =
  | ActionSetACtiveFormType
  | ActionSetActiveInputDateType;
