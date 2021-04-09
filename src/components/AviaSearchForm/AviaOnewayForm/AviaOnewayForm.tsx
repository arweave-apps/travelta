import React from 'react';

import { SegmentType } from '../../../redux/reducers/aviaParams';

import SwitchButton from '../../SwitchButton';
import TextField from '../../TextField';
import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import Datepicker from '../../Datepicker';

import './AviaOnewayForm.scss';

type AviaOnewayFormProps = {
  segments: SegmentType[];
  onChange: (
    e: React.FormEvent<HTMLInputElement>,
    segmentId: string,
    fieldType: string
  ) => void;
};

const AviaOnewayForm = ({
  segments,
  onChange,
}: AviaOnewayFormProps): JSX.Element => {
  const { id, origin, destination, returnDate, departureDate } = segments[0];

  return (
    <div className="oneway-form">
      <div className="oneway-form__origin">
        <TextField
          placeholder="Откуда"
          id={`origin-${id}`}
          value={origin}
          onChange={(e) => onChange(e, id, 'origin')}
        />
        <SwitchButton />
      </div>

      <div className="oneway-form__destination">
        <TextField
          placeholder="Куда"
          id={`destination=${id}`}
          value={destination}
          onChange={(e) => onChange(e, id, 'destination')}
        />
      </div>

      <div className="oneway-form__datepicker">
        <Datepicker
          segmentId={id}
          returnDate={returnDate}
          departureDate={departureDate}
        />
      </div>

      <div className="oneway-form__select">
        <PassangerSelector />
      </div>

      <div className="oneway-form__search-btn">
        <SimpleButton submit accent title="Найти" />
      </div>
    </div>
  );
};

export default AviaOnewayForm;
