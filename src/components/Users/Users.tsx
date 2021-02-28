import React from 'react';
import { useSelector } from 'react-redux';

import { InitialUserStateType } from '../../redux/reducers/user';

import './Users.scss';

type StateType = {
  users: InitialUserStateType;
};

const Users = (): JSX.Element => {
  const users = useSelector((state: StateType) => state.users.users);

  return (
    <div>
      {users.map((user) => {
        const { id, name, username, email } = user;

        return (
          <div key={id} className="users">
            <div className="users__item">{id}</div>
            <div className="users__item">{name}</div>
            <div className="users__item">{username}</div>
            <div className="users__item">{email}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
