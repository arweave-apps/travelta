import React, { useState } from 'react';

import Dropdown from './Dropdown';

import './CurrencySelector.scss';

const currencyList = [
  { label: 'RUB', name: 'Рубли' },
  { label: 'EUR', name: 'Евоо' },
  { label: 'USD', name: 'Доллары' },
];

const CurrencySelector = (): JSX.Element => {
  const [isOpen, setOpen] = useState(false);

  const dropdownHandler = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="currency-selector">
      <button
        type="button"
        className="currency-selector__btn"
        onClick={dropdownHandler}
      >
        <span>RUB</span>
      </button>

      {isOpen && <Dropdown items={currencyList} />}
    </div>
  );
};

export default CurrencySelector;
