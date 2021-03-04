import React from 'react';

import './SearchPanel.scss';

type SearchPanelProps = { children: React.ReactNode };

const SearchPanel = ({ children }: SearchPanelProps): JSX.Element => {
  return <div className="search-panel">{children}</div>;
};

export default SearchPanel;
