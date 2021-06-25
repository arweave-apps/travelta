import React from 'react';

import './ListItem.scss';

type ListItemProps = {
  children: React.ReactNode;
};

const ListItem = ({ children }: ListItemProps): JSX.Element => {
  return <li className="list__item">{children}</li>;
};

export default ListItem;
