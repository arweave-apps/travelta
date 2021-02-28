import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootStateType } from '../../reducers';

import { SET_USERS, ActionUsersTypes, UserObject } from './types';

type ThunkType = ThunkAction<
  Promise<void>,
  RootStateType,
  unknown,
  Action<ActionUsersTypes['type']>
>;

export const setUsers = (users: Array<UserObject>): ActionUsersTypes => ({
  type: SET_USERS,
  payload: users,
});

const fetchUsers = (): ThunkType => async (dispatch) => {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );

    dispatch(setUsers(response.data));
  } catch (error) {
    throw new Error(error);
  }
};

export default fetchUsers;
