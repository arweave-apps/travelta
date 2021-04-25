import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { SegmentType } from '../../../redux/reducers/aviaParams';
import { addSegment } from '../../../redux/actions/aviaParams/aviaParams';

import { ErrorMessagesType, ErrorsType } from '../AviaSearchForm';
import { Cities } from '../../../redux/reducers/locations';

import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import Datepicker from '../../Datepicker';

import './AviaMultiForm.scss';
import Autocomplete from '../../Autocomplete';

type AviaMultiFormProps = {
  segments: SegmentType[];
  errors: ErrorsType;
  errorMessages: ErrorMessagesType;
  disabledSubmit: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    segmentId: string,
    fieldType: string
  ) => void;
  onClickItem: (
    name: string,
    segmentId: string,
    code: string,
    fieldType: string
  ) => void;
  onFocus: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  isOpenOriginDropdown: boolean;
  isOpenDepartureDropdown: boolean;
  locations: Cities[] | null;
  originRef: React.RefObject<HTMLDivElement>;
  destinationRef: React.RefObject<HTMLDivElement>;
};

const AviaMultiForm = ({
  segments,
  errors,
  errorMessages,
  disabledSubmit,
  onChange,
  onFocus,
  onBlur,
  onClickItem,
  isOpenOriginDropdown,
  isOpenDepartureDropdown,
  locations,
  originRef,
  destinationRef,
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
        const { id, origin, destination, returnDate, departureDate } = segment;

        return (
          <div className="multicity-form__segment" key={id}>
            <div className="multicity-form__origin" ref={originRef}>
              <Autocomplete
                segmentId={id}
                fieldValue={origin}
                placeholder="Откуда"
                onChange={(e) => onChange(e, id, 'origin')}
                onFocus={(e) => onFocus(e)}
                onClickItem={onClickItem}
                onBlur={onBlur}
                errors={errors}
                errorMessages={errorMessages}
                isOpen={isOpenOriginDropdown}
                locations={locations}
                fieldName="origin"
              />
            </div>

            <div className="multicity-form__destination" ref={destinationRef}>
              <Autocomplete
                segmentId={id}
                fieldValue={destination}
                placeholder="Куда"
                onChange={(e) => onChange(e, id, 'destination')}
                onFocus={(e) => onFocus(e)}
                onClickItem={onClickItem}
                onBlur={onBlur}
                errors={errors}
                errorMessages={errorMessages}
                isOpen={isOpenDepartureDropdown}
                locations={locations}
                fieldName="destination"
              />
            </div>

            <div className="multicity-form__datepicker">
              <Datepicker
                segmentId={id}
                returnDate={returnDate}
                departureDate={departureDate}
                errors={errors}
                errorMessages={errorMessages}
                onFocus={onFocus}
                onBlur={onBlur}
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
          <SimpleButton submit accent title="Найти" disabled={disabledSubmit} />
        </div>
      </div>
    </div>
  );
};

export default AviaMultiForm;
