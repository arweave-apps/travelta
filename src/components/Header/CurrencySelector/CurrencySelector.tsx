import React, { useCallback, useEffect, useRef, useState } from 'react';
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

function useOutsideClick(
  ref: React.RefObject<HTMLDivElement>,
  func: () => void,
  isOpen: boolean
) {
  useEffect(() => {
    function clickOutsideHandler(e: MouseEvent) {
      if (
        isOpen &&
        e.target instanceof Node &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        func();
      }
    }

    document.addEventListener('click', clickOutsideHandler);

    return () => {
      document.removeEventListener('click', clickOutsideHandler);
    };
  }, [func, isOpen, ref]);
}

const CurrencySelector = (): JSX.Element => {
  const dispatch = useDispatch();
  const currency = useSelector(({ settings }: StateType) => settings.currency);
  const [isOpen, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef, () => setOpen(false), isOpen);

  const toggleDropDownMenu = () => {
    setOpen(!isOpen);
  };

  const currencySelectHandler = useCallback(
    (value: string) => {
      dispatch(setCurrency(value));
    },
    [dispatch]
  );

  return (
    <div ref={wrapperRef} className="currency-selector">
      <button
        type="button"
        className="currency-selector__btn"
        onClick={toggleDropDownMenu}
      >
        <span>{currency}</span>
      </button>

      {isOpen && (
        <Dropdown
          items={currencyList}
          onClick={currencySelectHandler}
          currentCurrency={currency}
        />
      )}
    </div>
  );
};

export default CurrencySelector;
