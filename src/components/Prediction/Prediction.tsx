import React from 'react';

import PredictionItem from './PredictionItem/PredictionItem';
import Panel from '../Panel';

import './Prediction.scss';

const items = [
  // eslint-disable-next-line sonarjs/no-duplicate-string
  { id: 1, price: '12 000 ₽', date: '01 мар, ср' },
  { id: 2, price: '12 000 ₽', date: '01 мар, ср' },
  { id: 3, price: '12 000 ₽', date: '01 мар, ср' },
  { id: 4, price: '12 000 ₽', date: '01 мар, ср' },
  { id: 5, price: '12 000 ₽', date: '01 мар, ср' },
  { id: 6, price: '12 000 ₽', date: '01 мар, ср' },
];

const Prediction = (): JSX.Element => {
  return (
    <Panel className="prediction">
      {items.map(({ id, price, date }) => {
        return <PredictionItem key={id} price={price} date={date} />;
      })}
    </Panel>
  );
};

export default Prediction;
