import React from 'react';

import classNames from 'classnames';

import './SectionInfo.scss';

type SectionInfoProps = { children: React.ReactNode; isSearchPage: boolean };

const SectionInfo = ({
  children,
  isSearchPage,
}: SectionInfoProps): JSX.Element => {
  return (
    <section className={classNames('info', { 'info--search': isSearchPage })}>
      <div className="container-big">
        <div
          className={classNames('info__inner', {
            'info__inner--search': isSearchPage,
          })}
        >
          {!isSearchPage && (
            <div className="info__titles">
              <h2 className="info__title">Исследуй новые места</h2>
              <h3 className="info__subtitle">
                Найди отличный отель, тур, машину, ж/д или авиабилеты
              </h3>
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  );
};

export default SectionInfo;
