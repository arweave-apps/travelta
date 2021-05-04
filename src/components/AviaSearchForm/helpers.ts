import { FormikErrors, FormikTouched } from 'formik';
import { SegmentType } from '../../redux/reducers/aviaParams';
import { Cities } from '../../redux/reducers/locations';
import { FormsType } from '../../redux/reducers/pageSettings';

export type InitialValues = {
  [key: string]: string | Date | null;
};

export type ErrorsType = {
  [key: string]: string;
};

type Keys<T> = Array<keyof T>;

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

export const getInitialValues = (
  segments: SegmentType[],
  activeForm: FormsType
): InitialValues => {
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

export const validate = (values: InitialValues): ErrorsType => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    if (!value) {
      const error = key.split('-')[0] as ErrorMessagesType;
      acc[key] = errorMessages[error];
    }
    return acc;
  }, {} as ErrorsType);
};

export type SearchFormsPropsType = {
  type?: FormsType;
  segments: SegmentType[];
  values: InitialValues;
  errors: FormikErrors<InitialValues>;
  touched: FormikTouched<InitialValues>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickItem: (
    name: string,
    segmentId: string,
    code: string,
    fieldType: string
  ) => void;
  onFocus: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FormEvent<HTMLInputElement>) => void;
  isDisabledSubmit: boolean;
  isOpenDropdown: boolean;
  locations: Cities[] | null;
  activeInputName: string;
  addToRefs: (el: HTMLDivElement) => void;
  onSetFormikValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  onSetFormikDepartureDate: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  onSetFormikReturnDate: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  onSetFormikTouchedDepartureDate: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
  onSetFormikTouchedReturnDate: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
};
