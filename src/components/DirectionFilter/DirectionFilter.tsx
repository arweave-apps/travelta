import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveForm } from '../../redux/actions/pageSettings/pageSettings';
import { InitialPageSettingsStateType } from '../../redux/reducers/pageSettings';

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

type StateType = {
  pageSettings: InitialPageSettingsStateType;
};

const DirectionFilter = (): JSX.Element => {
  const dispatch = useDispatch();
  const activeForm = useSelector(
    (state: StateType) => state.pageSettings.activeForm
  );
  const [option, setOption] = useState('roundtrip');

  const handleChangeRadioButton = (id: string) => {
    if (id === 'multiCity') {
      dispatch(setActiveForm(id));
    } else if (activeForm !== 'standart') {
      dispatch(setActiveForm('standart'));
    }
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
