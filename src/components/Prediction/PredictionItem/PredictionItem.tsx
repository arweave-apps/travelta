import React from 'react';

import './PredictionItem.scss';

type PredictionItemProps = {
  price: string;
  date: string;
};

const PredictionItem = ({ price, date }: PredictionItemProps): JSX.Element => {
  return (
    <div className="prediction__item">
      <div className="prediction__price">{price}</div>
      <div className="prediction__date">{date}</div>
    </div>
  );
};

export default PredictionItem;
