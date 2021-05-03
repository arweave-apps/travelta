import React from 'react';

import { PassangersNamesTypes } from '../../redux/reducers/aviaParams';

import PlusIcon from '../../assets/images/icons/plus.svg';
import MinusIcon from '../../assets/images/icons/minus.svg';

import CounterButton from './CounterButton';

import './Counter.scss';

type CounterProps = {
  passangerType: PassangersNamesTypes;
  number: number;
  onClickCounter: (number: number, name: PassangersNamesTypes) => void;
  minDisabled: boolean;
  maxDisabled: boolean;
};

const Counter = ({
  passangerType,
  number,
  onClickCounter,
  minDisabled,
  maxDisabled,
}: CounterProps): JSX.Element => {
  return (
    <div className="counter">
      <CounterButton
        icon={<MinusIcon />}
        onClick={() => onClickCounter(number - 1, passangerType)}
        disabled={minDisabled}
      />

      <div className="counter__number">{number}</div>

      <CounterButton
        icon={<PlusIcon />}
        onClick={() => onClickCounter(number + 1, passangerType)}
        disabled={maxDisabled}
      />
    </div>
  );
};

export default Counter;
