import React from 'react';
import { useSelector } from 'react-redux';

import { RootStateType } from '../../redux/reducers';

import AviaStandartForm from './StandartForm/AviaStandartForm';
import AviaMultiForm from './AviaMultiForm';

import './AviaSearchForm.scss';

const AviaSearchForm = (): JSX.Element => {
  const activeForm = useSelector(
    (state: RootStateType) => state.pageSettings.activeForm
  );

  return activeForm === 'standart' ? <AviaStandartForm /> : <AviaMultiForm />;
};

export default AviaSearchForm;
