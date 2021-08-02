import React from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  initialValues,
  validationSchema,
  validationSchemaOneDate,
} from './helpers';

import {
  getActiveForm,
  getCurrency,
  getPassangers,
  getSelectedCabins,
} from '../../selectors/selectors';

import Form from './Form';
import { fetchTickets } from '../../redux/actions/tickets/tickets';

const AviaSearchForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const currency = useSelector(getCurrency);
  const passangers = useSelector(getPassangers);
  const selectedCabins = useSelector(getSelectedCabins);
  const activeForm = useSelector(getActiveForm);

  const currentValidationSchema =
    activeForm === 'roundtrip' ? validationSchema : validationSchemaOneDate;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={currentValidationSchema}
      onSubmit={({ segments }) => {
        if (!history.location.pathname.includes('search')) {
          history.push(`${history.location.pathname}/search`);
        }

        dispatch(
          fetchTickets(
            segments,
            passangers,
            selectedCabins,
            currency,
            activeForm
          )
        );
      }}
    >
      <Form />
    </Formik>
  );
};

export default AviaSearchForm;
