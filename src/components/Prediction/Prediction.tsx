import React from 'react';

import './Prediction.scss';
import PredictionItem from './PredictionItem/PredictionItem';

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
    <div className="prediction">
      {items.map(({ id, price, date }) => {
        return <PredictionItem key={id} price={price} date={date} />;
      })}
    </div>
  );
};

export default Prediction;
