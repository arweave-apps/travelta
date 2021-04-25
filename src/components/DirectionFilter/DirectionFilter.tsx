import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { clearSegments } from '../../redux/actions/aviaParams/aviaParams';
import { setActiveForm } from '../../redux/actions/pageSettings/pageSettings';
import { RootStateType } from '../../redux/reducers';

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
  const dispatch = useDispatch();
  const activeForm = useSelector(
    (state: RootStateType) => state.pageSettings.activeForm
  );

  const handleChangeRadioButton = (id: string) => {
    dispatch(setActiveForm(id));
    dispatch(clearSegments());
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
            checked={id === activeForm}
            onChange={() => handleChangeRadioButton(id)}
          />
        );
      })}
    </div>
  );
};

export default DirectionFilter;
