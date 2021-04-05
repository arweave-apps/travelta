import React from 'react';
import { useLocation } from 'react-router-dom';

import SearchPanel from '../SearchPanel';
import SectionInfo from '../SectionInfo';

type InfoWrapperProps = { children: React.ReactNode };

const InfoWrapper = ({ children }: InfoWrapperProps): JSX.Element => {
  const { pathname } = useLocation();
  const isSearchPage = pathname.includes('search');

  return (
    <SectionInfo isSearchPage={isSearchPage}>
      <SearchPanel>{children}</SearchPanel>
    </SectionInfo>
  );
};

export default InfoWrapper;
