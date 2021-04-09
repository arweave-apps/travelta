import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { SegmentType } from '../../../redux/reducers/aviaParams';
import { addSegment } from '../../../redux/actions/aviaParams/aviaParams';

import TextField from '../../TextField';
import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import Datepicker from '../../Datepicker';

import './AviaMultiForm.scss';

type AviaMultiFormProps = {
  segments: SegmentType[];
  onChange: (
    e: React.FormEvent<HTMLInputElement>,
    segmentId: string,
    fieldType: string
  ) => void;
};

const AviaMultiForm = ({
  segments,
  onChange,
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
            <div className="multicity-form__origin">
              <TextField
                placeholder="Откуда"
                id={`origin-${id}`}
                value={origin}
                onChange={(e) => onChange(e, id, 'origin')}
              />
            </div>

            <div className="multicity-form__destination">
              <TextField
                placeholder="Куда"
                id={`destination-${id}`}
                value={destination}
                onChange={(e) => onChange(e, id, 'destination')}
              />
            </div>

            <div className="multicity-form__datepicker">
              <Datepicker
                segmentId={id}
                returnDate={returnDate}
                departureDate={departureDate}
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
          <SimpleButton submit accent title="Найти" />
        </div>
      </div>
    </div>
  );
};

export default AviaMultiForm;
