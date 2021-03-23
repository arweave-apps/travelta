import React, { useState } from 'react';
import RadioButton from '../RadioButton';

import './DirectionFilter.scss';

export const filterItems = [
  {
    id: 'roundtrip',
    text: 'Туда-обратно',
  },
  {
    id: 'oneWay',
    text: 'В одну сторону',
  },
  {
    id: 'multiCity',
    text: 'Сложный маршрут',
  },
];

const DirectionFilter = (): JSX.Element => {
  const [option, setOption] = useState('roundtrip');

  const handleChangeRadioButton = (id: string) => {
    setOption(id);
  };

  return (
    <div className="direction-filter">
      {filterItems.map(({ id, text }) => {
        return (
          <RadioButton
            key={id}
            id={id}
            title={text}
            name="direction"
            checked={id === option}
            onChange={() => handleChangeRadioButton(id)}
          />
        );
      })}
    </div>
  );
};

export default DirectionFilter;
