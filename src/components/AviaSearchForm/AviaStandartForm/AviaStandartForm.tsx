import React from 'react';

import { FormikErrors, FormikTouched } from 'formik';

import { SegmentType } from '../../../redux/reducers/aviaParams';
import { InitialValues } from '../AviaSearchForm';
import { Cities } from '../../../redux/reducers/locations';

import SwitchButton from '../../SwitchButton';
import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import Datepicker from '../../Datepicker';
import Autocomplete from '../../Autocomplete';

import './AviaStandartForm.scss';

type AviaStandartFormProps = {
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

const AviaStandartForm = ({
  segments,
  values,
  errors,
  touched,
  onChange,
  onClickItem,
  onFocus,
  onBlur,
  isDisabledSubmit,
  isOpenDropdown,
  locations,
  activeInputName,
  addToRefs,
  onSetFormikValue,
  onSetFormikDepartureDate,
  onSetFormikReturnDate,
  onSetFormikTouchedDepartureDate,
  onSetFormikTouchedReturnDate,
}: AviaStandartFormProps): JSX.Element => {
  const { id, returnDate, departureDate } = segments[0];

  const origin = values[`origin-${id}`] as string;
  const destination = values[`destination-${id}`] as string;

  return (
    <div className="search-form">
      <div className="search-form__origin" ref={addToRefs}>
        <Autocomplete
          segmentId={id}
          fieldValue={origin}
          placeholder="Откуда"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onClickItem={onClickItem}
          isOpen={isOpenDropdown && activeInputName === `origin-${id}`}
          locations={locations}
          fieldName="origin"
          onSetFormikValue={onSetFormikValue}
          errorText={errors[`origin-${id}`]}
          hasError={!!touched[`origin-${id}`] && !!errors[`origin-${id}`]}
        />
        <SwitchButton />
      </div>

      <div className="search-form__destination" ref={addToRefs}>
        <Autocomplete
          segmentId={id}
          fieldValue={destination}
          placeholder="Куда"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onClickItem={onClickItem}
          isOpen={isOpenDropdown && activeInputName === `destination-${id}`}
          locations={locations}
          fieldName="destination"
          onSetFormikValue={onSetFormikValue}
          errorText={errors[`destination-${id}`]}
          hasError={
            !!touched[`destination-${id}`] && !!errors[`destination-${id}`]
          }
        />
      </div>

      <div className="search-form__datepicker">
        <Datepicker
          segmentId={id}
          returnDate={returnDate}
          departureDate={departureDate}
          errors={errors}
          touched={touched}
          onBlur={onBlur}
          onSetFormikDepartureDate={onSetFormikDepartureDate}
          onSetFormikReturnDate={onSetFormikReturnDate}
          onSetFormikTouchedDepartureDate={onSetFormikTouchedDepartureDate}
          onSetFormikTouchedReturnDate={onSetFormikTouchedReturnDate}
        />
      </div>

      <div className="search-form__select">
        <PassangerSelector />
      </div>
      <div className="search-form__search-btn">
        <SimpleButton submit accent title="Найти" disabled={isDisabledSubmit} />
      </div>
    </div>
  );
};

export default AviaStandartForm;
