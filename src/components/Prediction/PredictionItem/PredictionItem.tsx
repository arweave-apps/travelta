import React from 'react';

import { CurrencyType } from '../../../redux/reducers/settings';

// eslint-disable-next-line max-len
import getCurrencySymbolCharCode from '../../../utils/getCurrencySymbolCharCode';
import { getFormattedStringDate } from '../../../utils/dateUtils';

import './PredictionItem.scss';

type PredictionItemProps = {
  price: number;
  date: string;
  currency: CurrencyType;
};

const PredictionItem = ({
  price,
  date,
  currency,
}: PredictionItemProps): JSX.Element => {
  const dateObj = new Date(date);

  return (
    <div className="prediction__item">
      <div className="prediction__price">
        {price} {getCurrencySymbolCharCode(currency)}
      </div>
      <div className="prediction__date">{getFormattedStringDate(dateObj)}</div>
    </div>
  );
};

export default PredictionItem;
