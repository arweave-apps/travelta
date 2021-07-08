import React from 'react';

import Panel from '../Panel';

import './SearchPanel.scss';

type SearchPanelProps = { children: React.ReactNode };

const SearchPanel = ({ children }: SearchPanelProps): JSX.Element => {
  return <Panel className="search-panel">{children}</Panel>;
};

export default SearchPanel;
