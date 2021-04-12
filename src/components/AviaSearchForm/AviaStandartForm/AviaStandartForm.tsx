import React from 'react';

import { SegmentType } from '../../../redux/reducers/aviaParams';
import { ErrorMessagesType, ErrorsType } from '../AviaSearchForm';

import SwitchButton from '../../SwitchButton';
import TextField from '../../TextField';
import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import Datepicker from '../../Datepicker';

import './AviaStandartForm.scss';

type AviaStandartFormProps = {
  segments: SegmentType[];
  onChange: (
    e: React.FormEvent<HTMLInputElement>,
    segmentId: string,
    fieldType: string
  ) => void;
  errors: ErrorsType;
  errorMessages: ErrorMessagesType;
  disabledSubmit: boolean;
};

const AviaStandartForm = ({
  segments,
  onChange,
  errors,
  errorMessages,
  disabledSubmit,
}: AviaStandartFormProps): JSX.Element => {
  const { id, origin, destination, returnDate, departureDate } = segments[0];

  return (
    <div className="search-form">
      <div className="search-form__origin">
        <TextField
          placeholder="Откуда"
          id={`origin-${id}`}
          value={origin}
          onChange={(e) => onChange(e, id, 'origin')}
          hasError={errors[id]?.includes('origin')}
          errorText={errors[id]?.includes('origin') ? errorMessages.origin : ''}
        />
        <SwitchButton />
      </div>

      <div className="search-form__destination">
        <TextField
          placeholder="Куда"
          id={`destination-${id}`}
          value={destination}
          onChange={(e) => onChange(e, id, 'destination')}
          hasError={errors[id]?.includes('destination')}
          errorText={
            errors[id]?.includes('destination') ? errorMessages.destination : ''
          }
        />
      </div>

      <div className="search-form__datepicker">
        <Datepicker
          segmentId={id}
          returnDate={returnDate}
          departureDate={departureDate}
          errors={errors}
          errorMessages={errorMessages}
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
