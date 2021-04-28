import React from 'react';

import { SegmentType } from '../../../redux/reducers/aviaParams';
import { ErrorMessagesType, ErrorsType } from '../AviaSearchForm';
import { Cities } from '../../../redux/reducers/locations';

import SwitchButton from '../../SwitchButton';
import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import Datepicker from '../../Datepicker';
import Autocomplete from '../../Autocomplete';

import './AviaStandartForm.scss';

type AviaStandartFormProps = {
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

const AviaStandartForm = ({
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
}: AviaStandartFormProps): JSX.Element => {
  const { id, origin, destination, returnDate, departureDate } = segments[0];

  return (
    <div className="search-form">
      <div className="search-form__origin" ref={originRef}>
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
        <SwitchButton />
      </div>

      <div className="search-form__destination" ref={destinationRef}>
        <Autocomplete
          segmentId={id}
          fieldValue={destination}
          placeholder="Куда"
          onChange={(e) => onChange(e, id, 'destination')}
          onFocus={(e) => onFocus(e)}
          onClickItem={onClickItem}
          errors={errors}
          errorMessages={errorMessages}
          isOpen={isOpenDropdown && activeInputName === `destination-${id}`}
          locations={locations}
          fieldName="destination"
        />
      </div>

      <div className="search-form__datepicker">
        <Datepicker
          segmentId={id}
          returnDate={returnDate}
          departureDate={departureDate}
          errors={errors}
          errorMessages={errorMessages}
          onFocus={onFocus}
        />
      </div>

      <div className="search-form__select">
        <PassangerSelector />
      </div>
      <div className="search-form__search-btn">
        <SimpleButton submit accent title="Найти" disabled={disabledSubmit} />
      </div>
    </div>
  );
};

export default AviaStandartForm;
