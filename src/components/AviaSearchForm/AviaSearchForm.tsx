import React, { useEffect, useState } from 'react';

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

type FormsType = {
  [key: string]: JSX.Element;
};

const errorMessages = {
  departureDate: 'Укажите дату отправления',
  returnDate: 'Укажите дату возвращения',
  destination: 'Укажите город прибытия',
  origin: 'Укажите город отправления',
};

export type ErrorMessagesType = {
  [key: string]: string;
};

export type ErrorsType = {
  [key: string]: string[];
};

const AviaSearchForm = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formValid, setFormValid] = useState(true);
  const [errors, setErrors] = useState<ErrorsType>({});

  const activeForm = useSelector(
    (state: RootStateType) => state.pageSettings.activeForm
  );

  const aviaParams = useSelector((state: RootStateType) => state.aviaParams);

  useEffect(() => {
    setErrors({});

    // const isFormValid = aviaParams.segments.every(
    //   ({ origin, destination, returnDate, departureDate }) =>
    //     origin && destination && returnDate && departureDate
    // );

    // setFormValid(isFormValid);
  }, [activeForm]);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!history.location.pathname.includes('search')) {
      history.push(`${history.location.pathname}/search`);
    }

    aviaParams.segments.forEach((segment) => {
      const { id } = segment;
      const fieldValues = Object.values(segment);
      const fields = Object.keys(segment);
      const tempArr: string[] = [];

      fieldValues.forEach((value, i) => {
        if (!value && fields[i] !== 'id') {
          tempArr.push(fields[i]);
        }
      });

      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: tempArr,
      }));
    });
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

  const getForm = (type: string) => {
    const forms: FormsType = {
      multiCity: (
        <AviaMultiForm
          segments={aviaParams.segments}
          onChange={handleChange}
          errors={errors}
          errorMessages={errorMessages}
          disabledSubmit={!formValid}
        />
      ),
      oneWay: (
        <AviaOnewayForm
          segments={aviaParams.segments}
          onChange={handleChange}
          errors={errors}
          errorMessages={errorMessages}
          disabledSubmit={!formValid}
        />
      ),
      roundtrip: (
        <AviaStandartForm
          segments={aviaParams.segments}
          onChange={handleChange}
          errors={errors}
          errorMessages={errorMessages}
          disabledSubmit={!formValid}
        />
      ),
    };

    return forms[type];
  };

  return <form onSubmit={handleSubmitForm}>{getForm(activeForm)}</form>;
};

export default AviaSearchForm;
