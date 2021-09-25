import * as Yup from 'yup';
import { FormSegments } from '../../redux/reducers/aviaParams';

export const validationSchema = Yup.object().shape({
  segments: Yup.array().of(
    Yup.object().shape({
      origin: Yup.string().required('Укажите город отправления'),
      destination: Yup.string().required('Укажите город прибытия'),
      departureDate: Yup.string()
        .required('Укажите дату отправления')
        .nullable(),
      returnDate: Yup.string().required('Укажите дату возвращения').nullable(),
    })
  ),
});

export const validationSchemaOneDate = Yup.object().shape({
  segments: Yup.array().of(
    Yup.object().shape({
      origin: Yup.string().required('Укажите город отправления'),
      destination: Yup.string().required('Укажите город прибытия'),
      departureDate: Yup.string()
        .required('Укажите дату отправления')
        .nullable(),
    })
  ),
});

export type InitialValues = Record<'formSegments', FormSegments>;

export const initialValues: InitialValues = {
  formSegments: [
    {
      id: 'segment-1',
      origin: '',
      originCode: '',

      destination: '',
      destinationCode: '',

      departureDate: null,
      returnDate: null,
    },
  ],
};
