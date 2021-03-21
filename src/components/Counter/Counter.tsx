import React from 'react';

import PlusIcon from '../../assets/images/icons/plus.svg';
import MinusIcon from '../../assets/images/icons/minus.svg';

import CounterButton from './CounterButton';

import './Counter.scss';

type CounterProps = {
  number: number;
  onClickCounter: (number: number) => void;
  min: number;
  max: number;
};

const Counter = ({
  number,
  onClickCounter,
  min,
  max,
}: CounterProps): JSX.Element => {
  return (
    <div className="counter">
      <CounterButton
        icon={<MinusIcon />}
        onClick={() => onClickCounter(number - 1)}
        disabled={min === number}
      />

      <div className="counter__number">{number}</div>

      <CounterButton
        icon={<PlusIcon />}
        onClick={() => onClickCounter(number + 1)}
        disabled={max === number}
      />
    </div>
  );
};

export default Counter;
