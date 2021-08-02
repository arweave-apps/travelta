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

import { initialValues, InitialValues } from '../helpers';

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
  } = useFormikContext<InitialValues>();

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
    setValues(initialValues);
  }, [activeForm, setValues]);

  const handleSwitchCities = (
    formikValues: InitialValues,
    formikSetValues: (
      formikValuesFromInput: React.SetStateAction<InitialValues>,
      shouldValidate?: boolean | undefined
    ) => void,
    segmentId: string
  ) => {
    const newSegments = formikValues.segments.map((segment) => {
      return segment.id === segmentId
        ? {
            ...segment,
            origin: segment.destination,
            originCode: segment.destinationCode,
            destination: segment.origin,
            destinationCode: segment.originCode,
          }
        : segment;
    });

    formikSetValues({ ...formikValues, segments: newSegments });
  };

  return (
    <form
      className={`search-form search-form--${activeForm}`}
      onSubmit={handleSubmit}
    >
      <FieldArray
        name="segments"
        render={(arrayHelpers) => {
          return values.segments.map((segment, i) => {
            return (
              <div className="search-form__segment" key={segment.id}>
                <div className="search-form__origin">
                  <Autocomplete
                    inputName={`segments.${i}.origin`}
                    fieldValue={values.segments[i].origin}
                    placeholder="Откуда"
                    onChange={(e) => {
                      setFieldValue(`segments.${i}.origin`, e.target.value);

                      setIsOpenDropdown(true);
                      debounсe(e.target.value);
                    }}
                    onFocus={handleFocus}
                    onBlur={() => setFieldTouched(`segments.${i}.origin`)}
                    onClickItem={(name, code) => {
                      setFieldValue(`segments.${i}.origin`, name);
                      setFieldValue(`segments.${i}.originCode`, code);

                      dispatch(setLocations(null));
                      setIsOpenDropdown(false);
                      setActiveInputName('');
                    }}
                    isOpen={
                      isOpenDropdown &&
                      activeInputName === `segments.${i}.origin`
                    }
                    locations={locations}
                    errorText={getIn(errors, `segments.${i}.origin`)}
                    hasError={
                      getIn(touched, `segments.${i}.origin`) &&
                      getIn(errors, `segments.${i}.origin`)
                    }
                  />

                  {activeForm !== 'multiCity' && (
                    <SwitchButton
                      onClick={() =>
                        handleSwitchCities(values, setValues, segment.id)
                      }
                    />
                  )}
                </div>

                <div className="search-form__destination">
                  <Autocomplete
                    inputName={`segments.${i}.destination`}
                    fieldValue={values.segments[i].destination}
                    placeholder="Куда"
                    onChange={(e) => {
                      setFieldValue(
                        `segments.${i}.destination`,
                        e.target.value
                      );

                      debounсe(e.target.value);
                      setIsOpenDropdown(true);
                    }}
                    onFocus={handleFocus}
                    onBlur={() => setFieldTouched(`segments.${i}.destination`)}
                    onClickItem={(name, code) => {
                      setFieldValue(`segments.${i}.destination`, name);
                      setFieldValue(`segments.${i}.destinationCode`, code);

                      dispatch(setLocations(null));
                      setIsOpenDropdown(false);
                      setActiveInputName('');
                    }}
                    isOpen={
                      isOpenDropdown &&
                      activeInputName === `segments.${i}.destination`
                    }
                    locations={locations}
                    errorText={getIn(errors, `segments.${i}.destination`)}
                    hasError={
                      getIn(touched, `segments.${i}.destination`) &&
                      getIn(errors, `segments.${i}.destination`)
                    }
                  />
                </div>

                <div className="search-form__datepicker">
                  <Datepicker
                    segmentId={segment.id}
                    inputNameReturn={`segments.${i}.returnDate`}
                    inputNameDeparture={`segments.${i}.departureDate`}
                    returnDate={segment.returnDate}
                    departureDate={segment.departureDate}
                    segments={values.segments}
                    errorTextReturn={getIn(errors, `segments.${i}.returnDate`)}
                    errorTextDeparture={getIn(
                      errors,
                      `segments.${i}.departureDate`
                    )}
                    hasErrorDeparture={
                      getIn(touched, `segments.${i}.departureDate`) &&
                      getIn(errors, `segments.${i}.departureDate`)
                    }
                    hasErrorReturn={
                      getIn(touched, `segments.${i}.returnDate`) &&
                      getIn(errors, `segments.${i}.returnDate`)
                    }
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
                  />
                </div>

                {values.segments.length > 1 &&
                  values.segments[values.segments.length - 1] ===
                    values.segments[i] && (
                    <DeleteButton
                      onClick={() => {
                        if (values.segments.length === 1) {
                          return;
                        }

                        arrayHelpers.remove(values.segments.length - 1);
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
              disabled={values.segments.length > 5}
              onClick={() => {
                if (values.segments.length > 5) {
                  return;
                }

                const newSegment = {
                  id: `segment-${values.segments.length + 1}`,
                  origin: '',
                  originCode: '',
                  destination: '',
                  destinationCode: '',
                  departureDate: null,
                  returnDate: null,
                };

                setValues({
                  ...values,
                  segments: [...values.segments, newSegment],
                });
              }}
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
