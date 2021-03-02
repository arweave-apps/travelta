import React from 'react';

import './DirectionFilter.scss';

const DirectionFilter = (): JSX.Element => {
  return (
    <div className="direction-filter">
      <label htmlFor="roundtrip" className="direction-filter__label">
        <input
          id="roundtrip"
          type="radio"
          checked
          className="direction-filter__input"
        />
        <span>Туда-обратно</span>
      </label>

      <label htmlFor="oneWay" className="direction-filter__label">
        <input id="oneWay" type="radio" className="direction-filter__input" />
        <span>В одну сторону</span>
      </label>

      <label htmlFor="multiCity" className="direction-filter__label">
        <input
          id="multiCity"
          type="radio"
          className="direction-filter__input"
        />
        <span>Сложный маршрут</span>
      </label>
    </div>
  );
};

export default DirectionFilter;
