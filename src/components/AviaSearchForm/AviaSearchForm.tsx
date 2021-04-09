import React from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  setDestination,
  setOrigin,
} from '../../redux/actions/aviaParams/aviaParams';
import { RootStateType } from '../../redux/reducers';

import AviaStandartForm from './AviaStandartForm/AviaStandartForm';
import AviaMultiForm from './AviaMultiForm';
import AviaOnewayForm from './AviaOnewayForm';

import './AviaSearchForm.scss';

const AviaSearchForm = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const activeForm = useSelector(
    (state: RootStateType) => state.pageSettings.activeForm
  );

  const aviaParams = useSelector((state: RootStateType) => state.aviaParams);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (history.location.pathname.includes('search')) {
      return;
    }
    history.push(`${history.location.pathname}/search`);
  };

  const handleChange = (
    e: React.FormEvent<HTMLInputElement>,
    segmentId: string,
    fieldType: string
  ) => {
    if (fieldType === 'origin') {
      dispatch(setOrigin(e.currentTarget.value, segmentId));
    } else {
      dispatch(setDestination(e.currentTarget.value, segmentId));
    }
  };

  type FormsType = {
    [key: string]: JSX.Element;
  };

  const getForm = (type: string) => {
    const forms: FormsType = {
      multiCity: (
        <AviaMultiForm segments={aviaParams.segments} onChange={handleChange} />
      ),
      oneWay: (
        <AviaOnewayForm
          segments={aviaParams.segments}
          onChange={handleChange}
        />
      ),
      roundtrip: (
        <AviaStandartForm
          segments={aviaParams.segments}
          onChange={handleChange}
        />
      ),
    };

    return forms[type];
  };

  return <form onSubmit={handleSubmitForm}>{getForm(activeForm)}</form>;
};

export default AviaSearchForm;
