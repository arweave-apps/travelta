import { LocationObject } from '../../interfaces/locations';
import {
  ActionSetLocationsType,
  SET_LOCATIONS,
} from '../actions/locations/types';

const initialState: InitialLocationsStateType = {
  locations: null,
};

export type Cities = {
  id: string;
  name: string;
  code: string;
  country: string;
};

export type InitialLocationsStateType = {
  locations: Cities[] | null;
};

const updateLocations = (
  state: InitialLocationsStateType,
  payload: LocationObject[] | null
) => {
  if (!payload) {
    return { ...state, locations: payload };
  }

  const newLocations: Cities[] = payload.map((location) => {
    const { id, name, code, country } = location;
    return { id, name, code, country: country.name };
  });

  return { ...state, locations: newLocations };
};

export const locationsReducer = (
  state: InitialLocationsStateType = initialState,
  action: ActionSetLocationsType
): InitialLocationsStateType => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case SET_LOCATIONS: {
      return updateLocations(state, action.payload);
    }

    default:
      return state;
  }
};
