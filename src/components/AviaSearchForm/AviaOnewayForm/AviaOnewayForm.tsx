import React from 'react';

import { SearchFormsPropsType } from '../helpers';

import SwitchButton from '../../SwitchButton';
import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import Datepicker from '../../Datepicker';
import Autocomplete from '../../Autocomplete';

import './AviaOnewayForm.scss';

const AviaOnewayForm = ({
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
  const { id, returnDate, departureDate } = segments[0];

  const origin = values[`origin-${id}`] as string;
  const destination = values[`destination-${id}`] as string;

  return (
    <div className="oneway-form">
      <div className="oneway-form__origin">
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

      <div className="oneway-form__destination">
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

      <div className="oneway-form__datepicker">
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

      <div className="oneway-form__select">
        <PassangerSelector />
      </div>

      <div className="oneway-form__search-btn">
        <SimpleButton submit accent title="Найти" disabled={isDisabledSubmit} />
      </div>
    </div>
  );
};

export default AviaOnewayForm;
