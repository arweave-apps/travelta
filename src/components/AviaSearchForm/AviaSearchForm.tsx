import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useDebounce from '../../hooks/useDebounce';
import useOutsideClick from '../../hooks/useOutsideClick';

import {
  fetchLocations,
  setLocations,
} from '../../redux/actions/locations/locations';
import {
  setDestination,
  setOrigin,
} from '../../redux/actions/aviaParams/aviaParams';
import { RootStateType } from '../../redux/reducers';
import { SegmentType } from '../../redux/reducers/aviaParams';

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

const checkValue = (value: string | Date | null) =>
  value !== '' && value !== null;

const validateForm = (array: SegmentType[], activeForm: string): boolean =>
  array.every((segment) => {
    const fieldValues = Object.values(segment);
    const fieldKeys = Object.keys(segment);

    if (activeForm === 'oneWay' || activeForm === 'multiCity') {
      const idx = fieldKeys.findIndex((key) => key === 'returnDate');
      const newFieldValues = [
        ...fieldValues.slice(0, idx),
        ...fieldValues.slice(idx + 1),
      ];

      return newFieldValues.every(checkValue);
    }

    return fieldValues.every(checkValue);
  });

const AviaSearchForm = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isValidForm, setIsValidForm] = useState(true);
  const [formErrors, setFormErrors] = useState<ErrorsType>({});

  const [isOpenOriginDropdown, setIsOpenOriginDropdown] = useState(false);
  const [isOpenDestinationDropdown, setIsOpenDestinationDropdown] = useState(
    false
  );

  const wrapperOriginRef = useRef<HTMLDivElement>(null);
  const wrapperDestinationeRef = useRef<HTMLDivElement>(null);

  useOutsideClick(
    wrapperOriginRef,
    () => setIsOpenOriginDropdown(false),
    isOpenOriginDropdown
  );
  useOutsideClick(
    wrapperDestinationeRef,
    () => setIsOpenDestinationDropdown(false),
    isOpenDestinationDropdown
  );

  const { activeForm } = useSelector(
    (state: RootStateType) => state.pageSettings
  );

  const { segments } = useSelector((state: RootStateType) => state.aviaParams);
  const { locations } = useSelector((state: RootStateType) => state.locations);

  const validateSegments = (array: SegmentType[]) => {
    array.forEach((segment) => {
      const { id } = segment;
      const fieldValues = Object.values(segment);
      const fields = Object.keys(segment);
      const tempArr: string[] = [];

      fieldValues.forEach((value, i) => {
        if (!value && fields[i] !== 'id') {
          tempArr.push(fields[i]);
        }
      });

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [id]: tempArr,
      }));
    });
  };

  useEffect(() => {
    // clear errors when choose another form
    setFormErrors({});
    setIsValidForm(true);
  }, [activeForm]);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    validateSegments(segments);

    if (!validateForm(segments, activeForm)) {
      setIsValidForm(false);
      return;
    }

    if (!history.location.pathname.includes('search')) {
      history.push(`${history.location.pathname}/search`);
    }
  };

  const getCities = (value: string) => {
    dispatch(fetchLocations(value));
  };

  const debounсe = useDebounce(getCities, 500);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      segmentId: string,
      fieldType: string
    ) => {
      validateSegments(segments);

      if (!validateForm(segments, activeForm)) {
        setIsValidForm(false);
      } else {
        setIsValidForm(true);
      }

      if (fieldType === 'origin') {
        dispatch(setOrigin(e.currentTarget.value, '', segmentId));
      } else {
        dispatch(setDestination(e.currentTarget.value, '', segmentId));
      }

      debounсe(e.currentTarget.value);
    },
    [segments, activeForm, debounсe, dispatch]
  );

  const handleFocus = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (!validateForm(segments, activeForm)) {
        setIsValidForm(false);
      } else {
        setIsValidForm(true);
      }

      if (e.currentTarget.name.includes('origin')) {
        setIsOpenOriginDropdown(true);
      }

      if (e.currentTarget.name.includes('destination')) {
        setIsOpenDestinationDropdown(true);
      }
    },
    [activeForm, segments]
  );

  const handleBlur = useCallback(() => {
    validateSegments(segments);

    if (!validateForm(segments, activeForm)) {
      setIsValidForm(false);
    } else {
      setIsValidForm(true);
    }
  }, [activeForm, segments]);

  const handleClickCity = (
    name: string,
    segmentId: string,
    code: string,
    fieldName: string
  ) => {
    if (fieldName === 'origin') {
      dispatch(setOrigin(name, code, segmentId));
    } else {
      dispatch(setDestination(name, code, segmentId));
    }

    dispatch(setLocations(null));
    setIsOpenOriginDropdown(false);
    setIsOpenDestinationDropdown(false);
  };

  const getForm = (type: string) => {
    const forms: FormsType = {
      multiCity: (
        <AviaMultiForm
          segments={segments}
          onChange={handleChange}
          onClickItem={handleClickCity}
          onFocus={handleFocus}
          onBlur={handleBlur}
          errors={formErrors}
          errorMessages={errorMessages}
          disabledSubmit={!isValidForm}
          isOpenOriginDropdown={isOpenOriginDropdown}
          isOpenDepartureDropdown={isOpenDestinationDropdown}
          originRef={wrapperOriginRef}
          destinationRef={wrapperDestinationeRef}
          locations={locations}
        />
      ),
      oneWay: (
        <AviaOnewayForm
          segments={segments}
          onChange={handleChange}
          onClickItem={handleClickCity}
          onFocus={handleFocus}
          onBlur={handleBlur}
          errors={formErrors}
          errorMessages={errorMessages}
          disabledSubmit={!isValidForm}
          isOpenOriginDropdown={isOpenOriginDropdown}
          isOpenDepartureDropdown={isOpenDestinationDropdown}
          originRef={wrapperOriginRef}
          destinationRef={wrapperDestinationeRef}
          locations={locations}
        />
      ),
      roundtrip: (
        <AviaStandartForm
          segments={segments}
          onChange={handleChange}
          onClickItem={handleClickCity}
          onFocus={handleFocus}
          onBlur={handleBlur}
          errors={formErrors}
          errorMessages={errorMessages}
          disabledSubmit={!isValidForm}
          isOpenOriginDropdown={isOpenOriginDropdown}
          isOpenDepartureDropdown={isOpenDestinationDropdown}
          originRef={wrapperOriginRef}
          destinationRef={wrapperDestinationeRef}
          locations={locations}
        />
      ),
    };

    return forms[type];
  };

  return <form onSubmit={handleSubmitForm}>{getForm(activeForm)}</form>;
};

export default AviaSearchForm;
