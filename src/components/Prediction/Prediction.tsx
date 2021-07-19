import React from 'react';

import { PredictionWithId } from '../../redux/reducers/tickets';
import { CurrencyType } from '../../redux/reducers/settings';

import PredictionItem from './PredictionItem/PredictionItem';
import Panel from '../Panel';

import './Prediction.scss';

type PredictionPropsType = {
  items: PredictionWithId[];
  currency: CurrencyType;
};

const Prediction = ({ items, currency }: PredictionPropsType): JSX.Element => {
  return (
    <Panel className="prediction">
      {items.map(({ id, price, date }) => {
        return (
          <PredictionItem
            key={id}
            price={price}
            date={date}
            currency={currency}
          />
        );
      })}
    </Panel>
  );
};

export default Prediction;
