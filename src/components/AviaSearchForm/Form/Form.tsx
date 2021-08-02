import React, { useCallback, useEffect, useState } from 'react';
import { FieldArray, getIn, useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import useDebounce from '../../../hooks/useDebounce';

import {
  fetchLocations,
  setLocations,
} from '../../../redux/actions/locations/locations';

import { getActiveForm, getLocations } from '../../../selectors/selectors';

import Autocomplete from '../../Autocomplete';
import Datepicker from '../../Datepicker';
import DeleteButton from '../../DeleteButton';
import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import SwitchButton from '../../SwitchButton';

import { InitialValues } from '../helpers';

import {
  handleAddSegment,
  handleResetDate,
  handleSwitchCities,
} from './helpers';

import './Form.scss';

const Form = (): JSX.Element => {
  const {
    values,
    setFieldValue,
    setFieldTouched,
    setValues,
    touched,
    errors,
    isValid,
    handleSubmit,
    resetForm,
    handleChange,
  } = useFormikContext<InitialValues>();

  const { segments } = values;

  const dispatch = useDispatch();

  const locations = useSelector(getLocations);
  const activeForm = useSelector(getActiveForm);

  const [activeInputName, setActiveInputName] = useState<string>('');
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const getCities = (value: string) => {
    dispatch(fetchLocations(value));
  };

  const debounсe = useDebounce(getCities, 500);

  const handleFocus = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setActiveInputName(e.currentTarget.name);
  }, []);

  useEffect(() => {
    resetForm();
  }, [activeForm, resetForm]);

  const handleClickCity = (
    cityName: string,
    cityCode: string,
    fieldNameCity: string,
    fieldNameCode: string
  ) => {
    setFieldValue(fieldNameCity, cityName);
    setFieldValue(fieldNameCode, cityCode);

    dispatch(setLocations(null));
    setIsOpenDropdown(false);
    setActiveInputName('');
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = e.target.value;

    handleChange(e);

    debounсe(enteredValue);
    setIsOpenDropdown(true);
  };

  const isError = (fieldName: string): boolean =>
    getIn(touched, fieldName) && getIn(errors, fieldName);

  const isOpenLocationsDropdown = (fieldName: string): boolean =>
    isOpenDropdown && activeInputName === fieldName && !!locations;

  return (
    <form
      className={`search-form search-form--${activeForm}`}
      onSubmit={handleSubmit}
    >
      <FieldArray
        name="segments"
        render={(arrayHelpers) => {
          return segments.map((segment, i) => {
            return (
              <div className="search-form__segment" key={segment.id}>
                <div className="search-form__origin">
                  <Autocomplete
                    inputName={`segments.${i}.origin`}
                    fieldValue={segments[i].origin}
                    placeholder="Откуда"
                    onChange={handleChangeInput}
                    onFocus={handleFocus}
                    onBlur={() => setFieldTouched(`segments.${i}.origin`)}
                    onClickItem={(cityName, cityCode) =>
                      handleClickCity(
                        cityName,
                        cityCode,
                        `segments.${i}.origin`,
                        `segments.${i}.originCode`
                      )
                    }
                    isOpen={isOpenLocationsDropdown(`segments.${i}.origin`)}
                    locations={locations}
                    errorText={getIn(errors, `segments.${i}.origin`)}
                    hasError={isError(`segments.${i}.origin`)}
                  />

                  {activeForm !== 'multiCity' && (
                    <SwitchButton
                      onClick={() =>
                        handleSwitchCities(segments, setValues, segment.id)
                      }
                    />
                  )}
                </div>

                <div className="search-form__destination">
                  <Autocomplete
                    inputName={`segments.${i}.destination`}
                    fieldValue={segments[i].destination}
                    placeholder="Куда"
                    onChange={handleChangeInput}
                    onFocus={handleFocus}
                    onBlur={() => setFieldTouched(`segments.${i}.destination`)}
                    onClickItem={(cityName, cityCode) =>
                      handleClickCity(
                        cityName,
                        cityCode,
                        `segments.${i}.destination`,
                        `segments.${i}.destinationCode`
                      )
                    }
                    isOpen={isOpenLocationsDropdown(
                      `segments.${i}.destination`
                    )}
                    locations={locations}
                    errorText={getIn(errors, `segments.${i}.destination`)}
                    hasError={isError(`segments.${i}.destination`)}
                  />
                </div>

                <div className="search-form__datepicker">
                  <Datepicker
                    segmentId={segment.id}
                    inputNameReturn={`segments.${i}.returnDate`}
                    inputNameDeparture={`segments.${i}.departureDate`}
                    returnDate={segment.returnDate}
                    departureDate={segment.departureDate}
                    segments={segments}
                    errorTextReturn={getIn(errors, `segments.${i}.returnDate`)}
                    errorTextDeparture={getIn(
                      errors,
                      `segments.${i}.departureDate`
                    )}
                    hasErrorDeparture={isError(`segments.${i}.departureDate`)}
                    hasErrorReturn={isError(`segments.${i}.returnDate`)}
                    onBlurReturn={() =>
                      setFieldTouched(`segments.${i}.returnDate`)
                    }
                    onBlurDeparture={() =>
                      setFieldTouched(`segments.${i}.departureDate`)
                    }
                    onSetFormikDepartureDate={(date: Date | null) => {
                      setFieldValue(`segments.${i}.departureDate`, date);
                    }}
                    onSetFormikReturnDate={(date: Date | null) => {
                      setFieldValue(`segments.${i}.returnDate`, date);
                    }}
                    onResetFormikDate={(segmentId: string) =>
                      handleResetDate(segments, setValues, segmentId)
                    }
                  />
                </div>

                {segments.length > 1 &&
                  segments[segments.length - 1] === segments[i] && (
                    <DeleteButton
                      onClick={() => {
                        if (segments.length === 1) {
                          return;
                        }

                        arrayHelpers.remove(segments.length - 1);
                      }}
                    />
                  )}
              </div>
            );
          });
        }}
      />

      <div className="search-form__action">
        <div className="search-form__select">
          <PassangerSelector />
        </div>

        {activeForm === 'multiCity' && (
          <div className="search-form__add-btn">
            <SimpleButton
              bg="second"
              disabled={segments.length > 5}
              onClick={() => handleAddSegment(segments, setValues)}
            >
              + добавить перелёт
            </SimpleButton>
          </div>
        )}

        <div className="search-form__search-btn">
          <SimpleButton isSubmit bg="accent" disabled={!isValid}>
            Найти
          </SimpleButton>
        </div>
      </div>
    </form>
  );
};

export default Form;
