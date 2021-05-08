import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
  addSegment,
  deleteSegment,
} from '../../../redux/actions/aviaParams/aviaParams';

import { SearchFormsPropsType } from '../helpers';

import Autocomplete from '../../Autocomplete';
import Datepicker from '../../Datepicker';
import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import DeleteButton from '../../DeleteButton';

import './AviaMultiForm.scss';

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
  onSetFormikValue,
  onSetFormikDepartureDate,
  onSetFormikReturnDate,
  onSetFormikTouchedDepartureDate,
  onSetFormikTouchedReturnDate,
}: SearchFormsPropsType): JSX.Element => {
  const dispatch = useDispatch();

  const handleClickAddSegment = useCallback(() => {
    if (segments.length > 5) {
      return;
    }
    dispatch(addSegment());
  }, [dispatch, segments.length]);

  const handleClickDeleteSegment = useCallback(
    (segmentId) => {
      if (segments.length === 1) {
        return;
      }
      dispatch(deleteSegment(segmentId));
    },
    [dispatch, segments.length]
  );

  return (
    <div className="multicity-form">
      {segments.map((segment, i) => {
        const { id, returnDate, departureDate } = segment;
        const origin = values[`origin-${id}`] as string;
        const destination = values[`destination-${id}`] as string;

        return (
          <div className="multicity-form__segment" key={id}>
            <div className="multicity-form__origin">
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

            <div className="multicity-form__destination">
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

            {segments.length > 1 &&
              segments[segments.length - 1] === segments[i] && (
                <DeleteButton onClick={() => handleClickDeleteSegment(id)} />
              )}
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
