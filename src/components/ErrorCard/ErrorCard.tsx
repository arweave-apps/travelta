import React from 'react';

import Panel from '../Panel';

import './ErrorCard.scss';

type ErrorCardPorps = {
  title: string;
  recommendation?: string;
};

const ErrorCard = ({ title, recommendation }: ErrorCardPorps): JSX.Element => {
  return (
    <Panel className="error-card">
      <div className="error-card__title">
        <h3>{title}</h3>
      </div>
      {recommendation && (
        <p className="error-card__recommendation">{recommendation}</p>
      )}
    </Panel>
  );
};

export default ErrorCard;
