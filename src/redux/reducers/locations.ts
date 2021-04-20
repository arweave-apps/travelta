import {
  ActionLocationsTypes,
  SET_LOCATIONS,
  LocationObject,
} from '../actions/locations/type';

const initialState = {
  locations: null,
};

export type Cities = {
  name: string;
  code: string;
  country: string;
};

export type InitialLocationsStateType = {
  locations: Cities[] | null;
};

const updateLocations = (
  state: InitialLocationsStateType,
  payload: LocationObject[]
) => {
  const newLocations: Cities[] = payload.map((location) => {
    const { name, code, country } = location;
    return { name, code, country: country.name };
  });

  return { ...state, locations: newLocations };
};

export const locationsReducer = (
  state: InitialLocationsStateType = initialState,
  action: ActionLocationsTypes
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
