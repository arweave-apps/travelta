import React, { useState } from 'react';
import RadioButton from '../RadioButton';

import './DirectionFilter.scss';

const DirectionFilter = (): JSX.Element => {
  const [option, setOption] = useState('roundtrip');

  const optionHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setOption(e.currentTarget.id);
  };

  return (
    <div className="direction-filter">
      <RadioButton
        id="roundtrip"
        title="Туда-обратно"
        name="direction"
        option={option}
        onChange={optionHandler}
      />
      <RadioButton
        id="oneWay"
        title="В одну сторону"
        name="direction"
        option={option}
        onChange={optionHandler}
      />
      <RadioButton
        id="multiCity"
        title="Сложный маршрут"
        name="direction"
        option={option}
        onChange={optionHandler}
      />
    </div>
  );
};

export default DirectionFilter;
