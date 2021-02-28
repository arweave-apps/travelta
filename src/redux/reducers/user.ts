import { ActionUsersTypes, SET_USERS, UserObject } from '../actions/user/types';

const initialState = {
  users: [],
};

export type InitialUserStateType = {
  users: Array<UserObject>;
};

export const userReducer = (
  state: InitialUserStateType = initialState,
  action: ActionUsersTypes
): InitialUserStateType => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };

    default:
      return state;
  }
};
