/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import useDebounce from '../../hooks/useDebounce';

import {
  fetchLocations,
  setLocations,
} from '../../redux/actions/locations/locations';
import { fetchTickets } from '../../redux/actions/tickets/tickets';
import { setCity } from '../../redux/actions/aviaParams/aviaParams';
import { FormsType } from '../../redux/reducers/pageSettings';

import {
  getActiveForm,
  getLocations,
  getSegments,
  getCurrency,
  getPassangers,
  getSelectedCabins,
} from '../../selectors/selectors';

import { getInitialValues, validate, SearchFormsPropsType } from './helpers';

import AviaStandartForm from './AviaStandartForm/AviaStandartForm';
import AviaMultiForm from './AviaMultiForm';
import AviaOnewayForm from './AviaOnewayForm';

import './AviaSearchForm.scss';

const Form = ({
  type,
  ...otherProps
}: SearchFormsPropsType): JSX.Element | null => {
  const forms: Record<FormsType, JSX.Element> = {
    multiCity: <AviaMultiForm {...otherProps} />,
    oneWay: <AviaOnewayForm {...otherProps} />,
    roundtrip: <AviaStandartForm {...otherProps} />,
  };

  if (!type) {
    return null;
  }

  return forms[type];
};

const AviaSearchForm = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const segments = useSelector(getSegments);
  const locations = useSelector(getLocations);
  const activeForm = useSelector(getActiveForm);
  const currency = useSelector(getCurrency);
  const passangers = useSelector(getPassangers);
  const selectedCabins = useSelector(getSelectedCabins);

  const [activeInputName, setActiveInputName] = useState<string>('');
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const getCities = (value: string) => {
    dispatch(fetchLocations(value));
  };
  const debounсe = useDebounce(getCities, 500);

  const formik = useFormik({
    initialValues: getInitialValues(segments, activeForm),
    validate,
    enableReinitialize: true,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: () => {
      if (!history.location.pathname.includes('search')) {
        history.push(`${history.location.pathname}/search`);
      }
      dispatch(
        fetchTickets(segments, passangers, selectedCabins, currency, activeForm)
      );
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
        dispatch(setCity(name, code, segmentId, 'origin'));
      } else {
        dispatch(setCity(name, code, segmentId, 'destination'));
      }

      dispatch(setLocations(null));
      setIsOpenDropdown(false);
      setActiveInputName('');
    },
    [dispatch]
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Form
        type={activeForm}
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
        onSetFormikValue={formik.setFieldValue}
        onSetFormikDepartureDate={formik.setFieldValue}
        onSetFormikReturnDate={formik.setFieldValue}
        onSetFormikTouchedDepartureDate={formik.setFieldTouched}
        onSetFormikTouchedReturnDate={formik.setFieldTouched}
      />
    </form>
  );
};

export default AviaSearchForm;
