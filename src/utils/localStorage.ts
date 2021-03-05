import { InitialSettingsStateType } from '../redux/reducers/settings';

type LocalStorageStateType = {
  settings: InitialSettingsStateType;
};

export const loadState = (): undefined | LocalStorageStateType => {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: LocalStorageStateType): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};
