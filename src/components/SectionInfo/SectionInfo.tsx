import React from 'react';

import './SectionInfo.scss';

type SectionInfoProps = { children: React.ReactNode };

const SectionInfo = ({ children }: SectionInfoProps): JSX.Element => {
  return (
    <section className="info">
      <div className="container-big">
        <div className="info__inner">
          <div className="info__titles">
            <h2 className="info__title">Исследуй новые места</h2>
            <h3 className="info__subtitle">
              Найди отличный отель, тур, машину, ж/д или авиабилеты
            </h3>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
};

export default SectionInfo;
