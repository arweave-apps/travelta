import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import useOutsideClick from '../../hooks/useOutsideClick';
import getNounDeclension from '../../utils/getNounDeclension';

import {
  setCabinClass,
  setPassengers,
} from '../../redux/actions/aviaParams/aviaParams';

import { getPassengers, getSelectedCabins } from '../../selectors/selectors';

import { cabinClassItems, getCabinClassName, passengerItems } from './helpers';

import DownArrowIcon from '../../assets/images/icons/down-arrow.svg';

import Counter from '../Counter';
import RadioButton from '../RadioButton';
import Dropdown from '../Dropdown';
import TextBlock from '../TextBlock';
import DropdownItem from '../Dropdown/DropdownItem/DropdownItem';
import Divider from '../Divider';
import TriggerButton from '../TriggerButton';
import Icon from '../Icon';

import './PassengerSelector.scss';

import {
  CabinClassTypes,
  PassengersNamesTypes,
} from '../../redux/reducers/aviaParams';

const PassengerSelector = (): JSX.Element => {
  const dispatch = useDispatch();

  const passengers = useSelector(getPassengers);
  const selectedCabins = useSelector(getSelectedCabins);

  const [totalPassengers, setTotalPassengers] = useState<number>(1);
  const [isOpen, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, () => setOpen(false), isOpen);

  const toggleDropdownMenu = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    const { adults, children, infants } = passengers;
    const total = adults + children + infants;

    setTotalPassengers(total);
  }, [passengers, totalPassengers]);

  const handleChangeCabinClass = (cabinClass: CabinClassTypes) => {
    dispatch(setCabinClass(cabinClass));
  };

  const handleClickCounter = useCallback(
    (changedValue: number, passengerType: PassengersNamesTypes) => {
      if (passengerType === 'infants' && changedValue > passengers.adults) {
        return;
      }

      dispatch(setPassengers(changedValue, passengerType));
    },
    [dispatch, passengers.adults]
  );

  return (
    <div
      className={classNames('passenger-select', {
        'passenger-select--opened': isOpen,
      })}
      ref={wrapperRef}
    >
      <TriggerButton onClick={toggleDropdownMenu} />

      <div className="passenger-select__info">
        <span className="passenger-select__passengers">
          {`${totalPassengers} ${getNounDeclension(totalPassengers, [
            'пассажир',
            'пассажира',
            'пассажиров',
          ])}`}
        </span>

        <span className="passenger-select__cabin-class">
          {getCabinClassName(selectedCabins)}
        </span>
      </div>

      <Icon icon={<DownArrowIcon />} className="down-arrow" isActive={isOpen} />

      {isOpen && (
        <Dropdown>
          {passengerItems.map(({ text, subtext, count }) => {
            const { name, min, max } = count;
            const currentNumber = passengers[name];

            return (
              <DropdownItem key={name} hasMargin>
                <TextBlock text={text} subtext={subtext} hasColumn />

                <Counter
                  passengerType={name}
                  number={currentNumber}
                  minDisabled={
                    currentNumber === min ||
                    (name === 'adults' &&
                      passengers.adults === passengers.infants)
                  }
                  maxDisabled={
                    totalPassengers === max ||
                    (name === 'infants' &&
                      passengers.infants === passengers.adults)
                  }
                  onClickCounter={handleClickCounter}
                />
              </DropdownItem>
            );
          })}

          <Divider />

          {cabinClassItems.map(({ id, text, cabinClass }) => {
            return (
              <DropdownItem key={id}>
                <RadioButton
                  id={id}
                  title={text}
                  name="service-classes"
                  checked={cabinClass === selectedCabins}
                  onChange={() => handleChangeCabinClass(cabinClass)}
                />
              </DropdownItem>
            );
          })}
        </Dropdown>
      )}
    </div>
  );
};

export default PassengerSelector;
