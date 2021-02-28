import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { decrement, increment } from '../../redux/actions/counter/counter';
import { InitialCounterStateType } from '../../redux/reducers/counter';

import './Counter.scss';

type StateType = {
  counter: InitialCounterStateType;
};

const Counter = (): JSX.Element => {
  const dispatch = useDispatch();
  const value = useSelector((state: StateType) => state.counter.value);

  const decHandler = () => {
    dispatch(decrement());
  };

  const incHandler = () => {
    dispatch(increment());
  };

  return (
    <div className="counter">
      <button className="counter__btn" type="button" onClick={incHandler}>
        +
      </button>
      <div className="counter__value">{value}</div>
      <button className="counter__btn" type="button" onClick={decHandler}>
        -
      </button>
    </div>
  );
};

export default Counter;
