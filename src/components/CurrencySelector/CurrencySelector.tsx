import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InitialSettingsStateType } from '../../redux/reducers/settings';
import { setCurrency } from '../../redux/actions/settings/settings';

import useOutsideClick from '../../hooks/useOutsideClick';

import './CurrencySelector.scss';
import Dropdown from '../Dropdown';
import DropdownItem from '../Dropdown/DropdownItem/DropdownItem';
import TextBlock from '../TextBlock';
import TriggerButton from '../TriggerButton';

const currencyList = [
  { label: 'RUB', text: 'Рубли' },
  { label: 'EUR', text: 'Евро' },
  { label: 'USD', text: 'Доллары' },
];

type StateType = {
  settings: InitialSettingsStateType;
};

const CurrencySelector = (): JSX.Element => {
  const dispatch = useDispatch();
  const { currency } = useSelector(({ settings }: StateType) => settings);

  const [isOpen, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef, () => setOpen(false), isOpen);

  const toggleDropdownMenu = () => {
    setOpen(!isOpen);
  };

  const handleClickDropdownItem = useCallback(
    (value: string) => {
      dispatch(setCurrency(value));
    },
    [dispatch]
  );

  return (
    <div className="currency-selector" ref={wrapperRef}>
      <TriggerButton onClick={toggleDropdownMenu} />

      <span>{currency}</span>

      {isOpen && (
        <Dropdown>
          {currencyList.map((row) => {
            const { label, text } = row;

            return (
              <DropdownItem
                key={label}
                isActive={currency === label}
                hasHover
                onClickItem={() => handleClickDropdownItem(label)}
              >
                <TextBlock label={label} text={text} />
              </DropdownItem>
            );
          })}
        </Dropdown>
      )}
    </div>
  );
};

export default CurrencySelector;