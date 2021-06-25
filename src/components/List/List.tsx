import React from 'react';

import './List.scss';

type ListProps = {
  children: React.ReactNode;
};

const List = ({ children }: ListProps): JSX.Element => {
  return <ul className="list">{children}</ul>;
};

export default List;
