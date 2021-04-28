import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addSegment } from '../../../redux/actions/aviaParams/aviaParams';
import { SegmentType } from '../../../redux/reducers/aviaParams';
import { Cities } from '../../../redux/reducers/locations';
import Autocomplete from '../../Autocomplete';
import Datepicker from '../../Datepicker';
import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import { ErrorMessagesType, ErrorsType } from '../AviaSearchForm';
import './AviaMultiForm.scss';

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
  isOpenDropdown: boolean;
  locations: Cities[] | null;
  originRef: React.RefObject<HTMLDivElement>;
  destinationRef: React.RefObject<HTMLDivElement>;
  activeInputName: string;
};

const AviaMultiForm = ({
  segments,
  errors,
  errorMessages,
  disabledSubmit,
  onChange,
  onFocus,
  onClickItem,
  isOpenDropdown,
  locations,
  originRef,
  destinationRef,

  activeInputName,
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
                errors={errors}
                errorMessages={errorMessages}
                isOpen={isOpenDropdown && activeInputName === `origin-${id}`}
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
                errors={errors}
                errorMessages={errorMessages}
                isOpen={activeInputName === `destination-${id}`}
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
