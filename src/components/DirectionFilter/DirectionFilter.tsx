import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { clearSegments } from '../../redux/actions/aviaParams/aviaParams';
import { setActiveForm } from '../../redux/actions/pageSettings/pageSettings';
import { RootStateType } from '../../redux/reducers';
import { FormsType } from '../../redux/reducers/pageSettings';

import RadioButton from '../RadioButton';

import './DirectionFilter.scss';

type FilterItemstype = {
  id: FormsType;
  text: string;
};

export const filterItems: FilterItemstype[] = [
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

  const handleChangeRadioButton = (id: FormsType) => {
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
