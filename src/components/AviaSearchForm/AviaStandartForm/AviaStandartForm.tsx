import React from 'react';
import { useDispatch } from 'react-redux';

import { switchCities } from '../../../redux/actions/aviaParams/aviaParams';

import { SearchFormsPropsType } from '../helpers';

import SwitchButton from '../../SwitchButton';
import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import Datepicker from '../../Datepicker';
import Autocomplete from '../../Autocomplete';

import './AviaStandartForm.scss';

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
  onSetFormikValue,
  onSetFormikDepartureDate,
  onSetFormikReturnDate,
  onSetFormikTouchedDepartureDate,
  onSetFormikTouchedReturnDate,
}: SearchFormsPropsType): JSX.Element => {
  const { id, returnDate, departureDate } = segments[0];
  const dispatch = useDispatch();

  const origin = values[`origin-${id}`] as string;
  const destination = values[`destination-${id}`] as string;

  const handleClickSwitchCities = () => {
    dispatch(switchCities(id));
  };

  return (
    <div className="search-form">
      <div className="search-form__origin">
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

        <SwitchButton onClick={handleClickSwitchCities} />
      </div>

      <div className="search-form__destination">
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
        <SimpleButton isSubmit bg="accent" disabled={isDisabledSubmit}>
          Найти
        </SimpleButton>
      </div>
    </div>
  );
};

export default AviaStandartForm;
