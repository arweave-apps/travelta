import * as Yup from 'yup';

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

export type SegmentType = {
  id: string;
  origin: string;
  originCode: string;

  destination: string;
  destinationCode: string;

  departureDate: Date | null;
  returnDate: Date | null;
};

export type InitialValues = Record<'segments', SegmentType[]>;

export const initialValues: InitialValues = {
  segments: [
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
