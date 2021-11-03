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
    setValues,
    touched,
    errors,
    isValid,
    handleSubmit,
    resetForm,
    handleChange,
    handleBlur,
  } = useFormikContext<InitialValues>();

  const { formSegments } = values;

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
        name="formSegments"
        render={(arrayHelpers) => {
          return formSegments.map((segment, i) => {
            return (
              <div className="search-form__segment" key={segment.id}>
                <div className="search-form__origin">
                  <Autocomplete
                    inputName={`formSegments.${i}.origin`}
                    fieldValue={formSegments[i].origin}
                    placeholder="Откуда"
                    onChange={handleChangeInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onClickItem={(cityName, cityCode) =>
                      handleClickCity(
                        cityName,
                        cityCode,
                        `formSegments.${i}.origin`,
                        `formSegments.${i}.originCode`
                      )
                    }
                    isOpen={isOpenLocationsDropdown(`formSegments.${i}.origin`)}
                    locations={locations}
                    errorText={getIn(errors, `formSegments.${i}.origin`)}
                    hasError={isError(`formSegments.${i}.origin`)}
                  />

                  {activeForm !== 'multiCity' && (
                    <SwitchButton
                      onClick={() =>
                        handleSwitchCities(formSegments, setValues, segment.id)
                      }
                    />
                  )}
                </div>

                <div className="search-form__destination">
                  <Autocomplete
                    inputName={`formSegments.${i}.destination`}
                    fieldValue={formSegments[i].destination}
                    placeholder="Куда"
                    onChange={handleChangeInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onClickItem={(cityName, cityCode) =>
                      handleClickCity(
                        cityName,
                        cityCode,
                        `formSegments.${i}.destination`,
                        `formSegments.${i}.destinationCode`
                      )
                    }
                    isOpen={isOpenLocationsDropdown(
                      `formSegments.${i}.destination`
                    )}
                    locations={locations}
                    errorText={getIn(errors, `formSegments.${i}.destination`)}
                    hasError={isError(`formSegments.${i}.destination`)}
                  />
                </div>

                <div className="search-form__datepicker">
                  <Datepicker
                    segmentId={segment.id}
                    inputNameReturn={`formSegments.${i}.returnDate`}
                    inputNameDeparture={`formSegments.${i}.departureDate`}
                    returnDate={segment.returnDate}
                    departureDate={segment.departureDate}
                    segments={formSegments}
                    errorTextReturn={getIn(
                      errors,
                      `formSegments.${i}.returnDate`
                    )}
                    errorTextDeparture={getIn(
                      errors,
                      `formSegments.${i}.departureDate`
                    )}
                    hasErrorDeparture={isError(
                      `formSegments.${i}.departureDate`
                    )}
                    hasErrorReturn={isError(`formSegments.${i}.returnDate`)}
                    onBlurReturn={handleBlur}
                    onBlurDeparture={handleBlur}
                    onSetFormikDepartureDate={(date: Date | null) => {
                      setFieldValue(`formSegments.${i}.departureDate`, date);
                    }}
                    onSetFormikReturnDate={(date: Date | null) => {
                      setFieldValue(`formSegments.${i}.returnDate`, date);
                    }}
                    onResetFormikDate={(segmentId: string) =>
                      handleResetDate(formSegments, setValues, segmentId)
                    }
                  />
                </div>

                {formSegments.length > 1 &&
                  formSegments[formSegments.length - 1] === formSegments[i] && (
                    <DeleteButton
                      onClick={() => {
                        if (formSegments.length === 1) {
                          return;
                        }

                        arrayHelpers.remove(formSegments.length - 1);
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
              disabled={formSegments.length > 5}
              onClick={() => handleAddSegment(formSegments, setValues)}
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
