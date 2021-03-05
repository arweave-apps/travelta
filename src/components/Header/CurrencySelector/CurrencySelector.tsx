import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from '../../../redux/actions/settings/settings';
import { InitialSettingsStateType } from '../../../redux/reducers/settings';

import Dropdown from './Dropdown';

import './CurrencySelector.scss';

const currencyList = [
  { label: 'RUB', name: 'Рубли' },
  { label: 'EUR', name: 'Евро' },
  { label: 'USD', name: 'Доллары' },
];

type StateType = {
  settings: InitialSettingsStateType;
};

const CurrencySelector = (): JSX.Element => {
  const dispatch = useDispatch();
  const currency = useSelector(({ settings }: StateType) => settings.currency);
  const [isOpen, setOpen] = useState<boolean>(false);

  const selectorHandler = () => {
    setOpen(!isOpen);
  };

  const dropdownHandler = (value: string) => {
    dispatch(setCurrency(value));
  };

  return (
    <div className="currency-selector">
      <button
        type="button"
        className="currency-selector__btn"
        onClick={selectorHandler}
      >
        <span>{currency}</span>
      </button>

      {isOpen && (
        <Dropdown
          items={currencyList}
          onClick={dropdownHandler}
          currentCurrency={currency}
        />
      )}
    </div>
  );
};

export default CurrencySelector;
