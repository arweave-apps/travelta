import React from 'react';

import SearchPanel from '../SearchPanel';

import './SectionInfo.scss';

const SectionInfo = (): JSX.Element => {
  return (
    <section className="info">
      <div className="container-big">
        <div className="info__inner">
          <h2 className="info__title">Исследуй новые места</h2>
          <h3 className="info__subtitle">
            Найди отличный отель, тур, машину, ж/д или авиабилеты
          </h3>

          <SearchPanel />
        </div>
      </div>
    </section>
  );
};

export default SectionInfo;
