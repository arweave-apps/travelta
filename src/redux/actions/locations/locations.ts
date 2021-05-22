import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { locationsConfig } from '../../../api/apiConfig';
import { RootStateType } from '../../reducers';
import { ActionSetLocationsType, LocationObject, SET_LOCATIONS } from './types';

type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown,
  Action<ActionSetLocationsType['type']>
>;

export const setLocations = (
  locations: LocationObject[] | null
): ActionSetLocationsType => ({
  type: SET_LOCATIONS,
  payload: locations,
});

export const fetchLocations = (city: string): ThunkType => async (dispatch) => {
  try {
    const { url, apikey } = locationsConfig;
    const locale = 'ru-RU';

    const response = await axios.get(
      // eslint-disable-next-line max-len
      `${url}/query?term=${city}&locale=${locale}&active_only=true&location_types=city`,
      {
        headers: { apikey },
      }
    );

    dispatch(setLocations(response.data.locations));
  } catch (error) {
    throw new Error(error);
  }
};
