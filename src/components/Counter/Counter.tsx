import React from 'react';

import { PassengersNamesTypes } from '../../redux/reducers/aviaParams';

import PlusIcon from '../../assets/images/icons/plus.svg';
import MinusIcon from '../../assets/images/icons/minus.svg';

import CounterButton from './CounterButton';

import './Counter.scss';

type CounterProps = {
  passengerType: PassengersNamesTypes;
  number: number;
  onClickCounter: (number: number, name: PassengersNamesTypes) => void;
  minDisabled: boolean;
  maxDisabled: boolean;
};

const Counter = ({
  passengerType,
  number,
  onClickCounter,
  minDisabled,
  maxDisabled,
}: CounterProps): JSX.Element => {
  return (
    <div className="counter">
      <CounterButton
        icon={<MinusIcon />}
        onClick={() => onClickCounter(number - 1, passengerType)}
        disabled={minDisabled}
      />

      <div className="counter__number">{number}</div>

      <CounterButton
        icon={<PlusIcon />}
        onClick={() => onClickCounter(number + 1, passengerType)}
        disabled={maxDisabled}
      />
    </div>
  );
};

export default Counter;
