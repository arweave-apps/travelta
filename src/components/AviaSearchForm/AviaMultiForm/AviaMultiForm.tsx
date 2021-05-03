/* eslint-disable no-param-reassign */
import React, { useCallback } from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import { useDispatch } from 'react-redux';

import { addSegment } from '../../../redux/actions/aviaParams/aviaParams';
import { SegmentType } from '../../../redux/reducers/aviaParams';
import { Cities } from '../../../redux/reducers/locations';

import Autocomplete from '../../Autocomplete';
import Datepicker from '../../Datepicker';
import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import { InitialValues } from '../AviaSearchForm';

import './AviaMultiForm.scss';

type AviaMultiFormProps = {
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

const AviaMultiForm = ({
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
}: AviaMultiFormProps): JSX.Element => {
  const dispatch = useDispatch();

  const handleClickAddSegment = useCallback(() => {
    if (segments.length > 5) {
      return;
    }
    dispatch(addSegment());
  }, [dispatch, segments.length]);

  return (
    <div className="multicity-form">
      {segments.map((segment) => {
        const { id, returnDate, departureDate } = segment;
        const origin = values[`origin-${id}`] as string;
        const destination = values[`destination-${id}`] as string;

        return (
          <div className="multicity-form__segment" key={id}>
            <div className="multicity-form__origin" ref={addToRefs}>
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
            </div>

            <div className="multicity-form__destination" ref={addToRefs}>
              <Autocomplete
                segmentId={id}
                fieldValue={destination}
                placeholder="Куда"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onClickItem={onClickItem}
                isOpen={activeInputName === `destination-${id}`}
                locations={locations}
                fieldName="destination"
                onSetFormikValue={onSetFormikValue}
                errorText={errors[`destination-${id}`]}
                hasError={
                  !!touched[`destination-${id}`] &&
                  !!errors[`destination-${id}`]
                }
              />
            </div>

            <div className="multicity-form__datepicker">
              <Datepicker
                segmentId={id}
                returnDate={returnDate}
                departureDate={departureDate}
                errors={errors}
                touched={touched}
                onBlur={onBlur}
                onSetFormikDepartureDate={onSetFormikDepartureDate}
                onSetFormikReturnDate={onSetFormikReturnDate}
                onSetFormikTouchedDepartureDate={
                  onSetFormikTouchedDepartureDate
                }
                onSetFormikTouchedReturnDate={onSetFormikTouchedReturnDate}
              />
            </div>
          </div>
        );
      })}

      <div className="multicity-form__action">
        <div className="multicity-form__select">
          <PassangerSelector />
        </div>

        <div className="multicity-form__add-btn">
          <SimpleButton
            second
            title="+ добавить перелёт"
            onClick={handleClickAddSegment}
            disabled={segments.length > 5}
          />
        </div>

        <div className="multicity-form__search-btn">
          <SimpleButton
            submit
            accent
            title="Найти"
            disabled={isDisabledSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AviaMultiForm;
