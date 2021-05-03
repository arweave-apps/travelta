import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

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
import { FormsType } from '../../redux/reducers/pageSettings';

import AviaStandartForm from './AviaStandartForm/AviaStandartForm';
import AviaMultiForm from './AviaMultiForm';
import AviaOnewayForm from './AviaOnewayForm';

import './AviaSearchForm.scss';

export type ErrorMessagesType =
  | 'departureDate'
  | 'returnDate'
  | 'destination'
  | 'origin';

const errorMessages: Record<ErrorMessagesType, string> = {
  departureDate: 'Укажите дату отправления',
  returnDate: 'Укажите дату возвращения',
  destination: 'Укажите город прибытия',
  origin: 'Укажите город отправления',
};

export type InitialValues = {
  [key: string]: string | Date | null;
};

export type ErrorsType = {
  [key: string]: string;
};

type Keys<T> = Array<keyof T>;

const getInitialValues = (segments: SegmentType[], activeForm: FormsType) => {
  return segments.reduce((acc, currSegment) => {
    const { id } = currSegment;
    const segmentKeys = Object.keys(currSegment) as Keys<typeof currSegment>;

    segmentKeys.forEach((key) => {
      if (activeForm === 'multiCity' || activeForm === 'oneWay') {
        if (
          key !== 'id' &&
          key !== 'originCode' &&
          key !== 'destinationCode' &&
          key !== 'returnDate'
        ) {
          acc[`${key}-${id}`] = currSegment[key];
        }
      } else if (
        key !== 'id' &&
        key !== 'originCode' &&
        key !== 'destinationCode'
      ) {
        acc[`${key}-${id}`] = currSegment[key];
      }
    });
    return acc;
  }, {} as InitialValues);
};

const validate = (values: InitialValues) => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    if (!value) {
      const error = key.split('-')[0] as ErrorMessagesType;

      acc[key] = errorMessages[error];
    }
    return acc;
  }, {} as ErrorsType);
};

const AviaSearchForm = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { segments } = useSelector((state: RootStateType) => state.aviaParams);
  const { locations } = useSelector((state: RootStateType) => state.locations);
  const [activeInputName, setActiveInputName] = useState<string>('');

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const refsArray = useRef<HTMLDivElement[]>([]);
  useOutsideClick(refsArray, () => setIsOpenDropdown(false), isOpenDropdown);

  const { activeForm } = useSelector(
    (state: RootStateType) => state.pageSettings
  );

  const getCities = (value: string) => {
    dispatch(fetchLocations(value));
  };
  const debounсe = useDebounce(getCities, 500);

  const addToRefs = useCallback((el: HTMLDivElement) => {
    if (el && !refsArray.current.includes(el)) {
      refsArray.current.push(el);
    }
  }, []);

  const formik = useFormik({
    initialValues: getInitialValues(segments, activeForm),
    validate,
    enableReinitialize: true,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: (values) => {
      if (!history.location.pathname.includes('search')) {
        history.push(`${history.location.pathname}/search`);
      }
    },
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;

      formik.handleChange(e);
      setIsOpenDropdown(true);
      debounсe(value);
    },
    [debounсe, formik]
  );

  const handleFocus = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setActiveInputName(e.currentTarget.name);
  }, []);

  const handleClickCity = useCallback(
    (name: string, segmentId: string, code: string, fieldName: string) => {
      if (fieldName === 'origin') {
        dispatch(setOrigin(name, code, segmentId));
      } else {
        dispatch(setDestination(name, code, segmentId));
      }

      dispatch(setLocations(null));
      setIsOpenDropdown(false);
      setActiveInputName('');
    },
    [dispatch]
  );

  const getForm = (type: FormsType) => {
    const forms: Record<FormsType, JSX.Element> = {
      multiCity: (
        <AviaMultiForm
          segments={segments}
          values={formik.values}
          errors={formik.errors}
          touched={formik.touched}
          onChange={handleChange}
          onClickItem={handleClickCity}
          onFocus={handleFocus}
          onBlur={formik.handleBlur}
          isDisabledSubmit={!formik.isValid}
          isOpenDropdown={isOpenDropdown}
          locations={locations}
          activeInputName={activeInputName}
          addToRefs={addToRefs}
          onSetFormikValue={formik.setFieldValue}
          onSetFormikDepartureDate={formik.setFieldValue}
          onSetFormikReturnDate={formik.setFieldValue}
          onSetFormikTouchedDepartureDate={formik.setFieldTouched}
          onSetFormikTouchedReturnDate={formik.setFieldTouched}
        />
      ),
      oneWay: (
        <AviaOnewayForm
          segments={segments}
          values={formik.values}
          errors={formik.errors}
          touched={formik.touched}
          onChange={handleChange}
          onClickItem={handleClickCity}
          onFocus={handleFocus}
          onBlur={formik.handleBlur}
          isDisabledSubmit={!formik.isValid}
          isOpenDropdown={isOpenDropdown}
          locations={locations}
          activeInputName={activeInputName}
          addToRefs={addToRefs}
          onSetFormikValue={formik.setFieldValue}
          onSetFormikDepartureDate={formik.setFieldValue}
          onSetFormikReturnDate={formik.setFieldValue}
          onSetFormikTouchedDepartureDate={formik.setFieldTouched}
          onSetFormikTouchedReturnDate={formik.setFieldTouched}
        />
      ),
      roundtrip: (
        <AviaStandartForm
          segments={segments}
          values={formik.values}
          errors={formik.errors}
          touched={formik.touched}
          onChange={handleChange}
          onClickItem={handleClickCity}
          onFocus={handleFocus}
          onBlur={formik.handleBlur}
          isDisabledSubmit={!formik.isValid}
          isOpenDropdown={isOpenDropdown}
          locations={locations}
          activeInputName={activeInputName}
          addToRefs={addToRefs}
          onSetFormikValue={formik.setFieldValue}
          onSetFormikDepartureDate={formik.setFieldValue}
          onSetFormikReturnDate={formik.setFieldValue}
          onSetFormikTouchedDepartureDate={formik.setFieldTouched}
          onSetFormikTouchedReturnDate={formik.setFieldTouched}
        />
      ),
    };

    return forms[type];
  };

  return <form onSubmit={formik.handleSubmit}>{getForm(activeForm)}</form>;
};

export default AviaSearchForm;
