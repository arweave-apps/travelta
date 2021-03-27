import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import useOutsideClick from '../../hooks/useOutsideClick';
import getNounDeclension from '../../utils/getNounDeclension';

import { RootStateType } from '../../redux/reducers';
import {
  setCabinClass,
  setPassangers,
} from '../../redux/actions/aviaParams/aviaParams';

import { cabinClassItems, getCabinClassName, passangerItems } from './helpers';

import DownArrowicon from '../../assets/images/icons/down-arrow.svg';

import Counter from '../Counter';
import RadioButton from '../RadioButton';
import Dropdown from '../Dropdown';
import TextBlock from '../TextBlock';
import DropdownItem from '../Dropdown/DropdownItem/DropdownItem';
import Divider from '../Divider';

import './PassangerSelector.scss';
import TriggerButton from '../TriggerButton';

const PassangerSelector = (): JSX.Element => {
  const dispatch = useDispatch();

  const passangers = useSelector(
    ({ aviaParams }: RootStateType) => aviaParams.passangers
  );

  const { selectedCabins } = useSelector(
    ({ aviaParams }: RootStateType) => aviaParams
  );

  const [totalPassangers, setTotalPassangers] = useState<number>(1);

  const [isOpen, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, () => setOpen(false), isOpen);

  const toggleDropdownMenu = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    const { adults, children, infants } = passangers;
    const total = adults + children + infants;

    setTotalPassangers(total);
  }, [passangers, totalPassangers]);

  const handleChangeCabinClass = (cabinClass: string) => {
    dispatch(setCabinClass(cabinClass));
  };

  const handleClickCounter = (changedValue: number, passangerType: string) => {
    if (passangerType === 'infants' && changedValue > passangers.adults) {
      return;
    }

    dispatch(setPassangers(changedValue, passangerType));
  };

  return (
    <div
      className={classNames('passanger-select', {
        'passanger-select--active': isOpen,
      })}
      ref={wrapperRef}
    >
      <TriggerButton onClick={toggleDropdownMenu} />

      <div className="passanger-select__info">
        <span className="passanger-select__passangers">
          {`${totalPassangers} ${getNounDeclension(totalPassangers, [
            'пассажир',
            'пассажира',
            'пассажиров',
          ])}`}
        </span>

        <span className="passanger-select__cabin-class">
          {getCabinClassName(selectedCabins)}
        </span>
      </div>

      <DownArrowicon
        className={classNames('down-arrow', { 'down-arrow--active': isOpen })}
      />

      {isOpen && (
        <Dropdown>
          {passangerItems.map(({ text, subtext, count }) => {
            const { name, min, max } = count;
            const currentNumber = passangers[name];

            return (
              <DropdownItem key={name} hasMargin>
                <TextBlock text={text} subtext={subtext} hasColumn />

                <Counter
                  passangerType={name}
                  number={currentNumber}
                  minDisabled={
                    currentNumber === min ||
                    (name === 'adults' &&
                      passangers.adults === passangers.infants)
                  }
                  maxDisabled={
                    totalPassangers === max ||
                    (name === 'infants' &&
                      passangers.infants === passangers.adults)
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

export default PassangerSelector;
