import React from 'react';
import { useSelector } from 'react-redux';

import { RootStateType } from '../../redux/reducers';

import AviaStandartForm from './AviaStandartForm/AviaStandartForm';
import AviaMultiForm from './AviaMultiForm';
import AviaOnewayForm from './AviaOnewayForm';

import './AviaSearchForm.scss';

const getForm = (activeForm: string) => {
  if (activeForm === 'multiCity') {
    return <AviaMultiForm />;
  }

  if (activeForm === 'oneWay') {
    return <AviaOnewayForm />;
  }

  return <AviaStandartForm />;
};

const AviaSearchForm = (): JSX.Element => {
  const activeForm = useSelector(
    (state: RootStateType) => state.pageSettings.activeForm
  );

  return getForm(activeForm);
};

export default AviaSearchForm;
