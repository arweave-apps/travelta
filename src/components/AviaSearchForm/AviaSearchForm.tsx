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

  const { segments } = useSelector((state: RootStateType) => state.aviaParams);
  const { locations } = useSelector((state: RootStateType) => state.locations);

  const [isValidForm, setIsValidForm] = useState(true);
  const [formErrors, setFormErrors] = useState<ErrorsType>({});
  const [activeInputName, setActiveInputName] = useState<string>('');

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const refsArray = useRef<HTMLDivElement[]>([]);
  useOutsideClick(refsArray, () => setIsOpenDropdown(false), isOpenDropdown);

  const { activeForm } = useSelector(
    (state: RootStateType) => state.pageSettings
  );

  const getSegmentsErrors = (array: SegmentType[]) => {
    array.forEach((segment) => {
      const { id } = segment;
      const fieldValues = Object.values(segment);
      const fields = Object.keys(segment);
      const errors: string[] = [];

      fieldValues.forEach((value, i) => {
        if (!value && fields[i] !== 'id') {
          errors.push(fields[i]);
        }
      });

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [id]: errors,
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

    getSegmentsErrors(segments);

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
      getSegmentsErrors(segments);

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

      setIsOpenDropdown(true);

      debounсe(e.currentTarget.value);
    },
    [segments, activeForm, debounсe, dispatch]
  );

  const handleFocus = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setActiveInputName(e.currentTarget.name);

      if (!validateForm(segments, activeForm)) {
        setIsValidForm(false);
      } else {
        setIsValidForm(true);
      }
    },
    [activeForm, segments]
  );

  const handleClickCity = (
    name: string,
    segmentId: string,
    code: string,
    fieldName: string
  ) => {
    getSegmentsErrors(segments);

    if (fieldName === 'origin') {
      dispatch(setOrigin(name, code, segmentId));
    } else {
      dispatch(setDestination(name, code, segmentId));
    }

    dispatch(setLocations(null));
    setIsOpenDropdown(false);
    setActiveInputName('');
  };

  const addToRefs = useCallback((el: HTMLDivElement) => {
    if (el && !refsArray.current.includes(el)) {
      refsArray.current.push(el);
    }
  }, []);

  const getForm = (type: string) => {
    const forms: FormsType = {
      multiCity: (
        <AviaMultiForm
          segments={segments}
          onChange={handleChange}
          onClickItem={handleClickCity}
          onFocus={handleFocus}
          errors={formErrors}
          errorMessages={errorMessages}
          disabledSubmit={!isValidForm}
          isOpenDropdown={isOpenDropdown}
          locations={locations}
          activeInputName={activeInputName}
          addToRefs={addToRefs}
        />
      ),
      oneWay: (
        <AviaOnewayForm
          segments={segments}
          onChange={handleChange}
          onClickItem={handleClickCity}
          onFocus={handleFocus}
          errors={formErrors}
          errorMessages={errorMessages}
          disabledSubmit={!isValidForm}
          isOpenDropdown={isOpenDropdown}
          locations={locations}
          activeInputName={activeInputName}
          addToRefs={addToRefs}
        />
      ),
      roundtrip: (
        <AviaStandartForm
          segments={segments}
          onChange={handleChange}
          onClickItem={handleClickCity}
          onFocus={handleFocus}
          errors={formErrors}
          errorMessages={errorMessages}
          disabledSubmit={!isValidForm}
          isOpenDropdown={isOpenDropdown}
          locations={locations}
          activeInputName={activeInputName}
          addToRefs={addToRefs}
        />
      ),
    };

    return forms[type];
  };

  return <form onSubmit={handleSubmitForm}>{getForm(activeForm)}</form>;
};

export default AviaSearchForm;
