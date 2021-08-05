import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import { setCurrency } from '../../redux/actions/settings/settings';
import { CurrencyType } from '../../redux/reducers/settings';

import useOutsideClick from '../../hooks/useOutsideClick';

import { getCurrency } from '../../selectors/selectors';

import Dropdown from '../Dropdown';
import DropdownItem from '../Dropdown/DropdownItem/DropdownItem';
import TextBlock from '../TextBlock';
import TriggerButton from '../TriggerButton';

import './CurrencySelector.scss';

type CurrencyTextType = 'Рубли' | 'Евро' | 'Доллары';
type CurrensyListType = { label: CurrencyType; text: CurrencyTextType };

const currencyList: CurrensyListType[] = [
  { label: 'RUB', text: 'Рубли' },
  { label: 'EUR', text: 'Евро' },
  { label: 'USD', text: 'Доллары' },
];

type CurrencySelectorProps = {
  isSearchPage: boolean;
};

const CurrencySelector = ({
  isSearchPage,
}: CurrencySelectorProps): JSX.Element => {
  const dispatch = useDispatch();
  const currency = useSelector(getCurrency);

  const [isOpen, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef, () => setOpen(false), isOpen);

  const toggleDropdownMenu = () => {
    setOpen(!isOpen);
  };

  const handleClickDropdownItem = useCallback(
    (value: CurrencyType) => {
      if (currency === value) {
        return;
      }

      dispatch(setCurrency(value));
    },
    [currency, dispatch]
  );

  return (
    <div
      className={classNames('currency-selector', {
        'currency-selector--search': isSearchPage,
      })}
      ref={wrapperRef}
    >
      <TriggerButton onClick={toggleDropdownMenu}>{currency}</TriggerButton>

      {isOpen && (
        <Dropdown>
          {currencyList.map((row) => {
            const { label, text } = row;

            return (
              <DropdownItem
                key={label}
                isActive={currency === label}
                hasHover
                onClick={() => handleClickDropdownItem(label)}
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
