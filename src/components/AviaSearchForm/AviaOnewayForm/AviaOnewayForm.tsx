import React from 'react';

import { SegmentType } from '../../../redux/reducers/aviaParams';
import { Cities } from '../../../redux/reducers/locations';

import { ErrorMessagesType, ErrorsType } from '../AviaSearchForm';

import SwitchButton from '../../SwitchButton';
import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import Datepicker from '../../Datepicker';

import './AviaOnewayForm.scss';
import Autocomplete from '../../Autocomplete';

type AviaOnewayFormProps = {
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

const AviaOnewayForm = ({
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
}: AviaOnewayFormProps): JSX.Element => {
  const { id, origin, destination, returnDate, departureDate } = segments[0];

  return (
    <div className="oneway-form">
      <div className="oneway-form__origin" ref={originRef}>
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
        <SwitchButton />
      </div>

      <div className="oneway-form__destination" ref={destinationRef}>
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

      <div className="oneway-form__datepicker">
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

      <div className="oneway-form__select">
        <PassangerSelector />
      </div>

      <div className="oneway-form__search-btn">
        <SimpleButton submit accent title="Найти" disabled={disabledSubmit} />
      </div>
    </div>
  );
};

export default AviaOnewayForm;
