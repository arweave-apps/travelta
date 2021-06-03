import { LocationObject } from '../../../interfaces/locations';

export const SET_LOCATIONS = 'SET_LOCATIONS';

export type ActionSetLocationsType = {
  type: typeof SET_LOCATIONS;
  payload: LocationObject[] | null;
};
