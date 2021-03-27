import React, { useCallback, useState } from 'react';

import useInput from '../../../hooks/useInput';

import TextInput from '../../TextInput';
import PassangerSelect from '../../PassangerSelect';
import SimpleButton from '../../SimpleButton';
import Datepicker from '../../Datepicker';

import './AviaMultiForm.scss';

// const segments = [{ id: 'segment 1' }, { id: 'segment 2' }];

const AviaMultiForm = (): JSX.Element => {
  const origin = useInput('');
  const destination = useInput('');

  const [segments, setSegments] = useState([
    { id: 'segment-1' },
    { id: 'segment-2' },
  ]);

  const [segmentsCount, setSegmentsCount] = useState(segments.length);

  const handleClickAddSegment = useCallback(() => {
    if (segmentsCount > 5) {
      return;
    }

    const newSegments = [...segments, { id: `segment-${segmentsCount + 1}` }];
    setSegments(newSegments);
    setSegmentsCount((prevState) => prevState + 1);
  }, [segments, segmentsCount]);

  return (
    <form className="multicity-form">
      {segments.map(({ id }) => {
        return (
          <div className="multicity-form__segment" key={id}>
            <div className="multicity-form__origin">
              <TextInput
                placeholder="Откуда"
                id={`origin-${id}`}
                value={origin.value}
                onChange={origin.onChange}
              />
            </div>

            <div className="multicity-form__destination">
              <TextInput
                placeholder="Куда"
                id={`destination-${id}`}
                value={destination.value}
                onChange={destination.onChange}
              />
            </div>

            <div className="multicity-form__datepicker">
              <Datepicker />
            </div>
          </div>
        );
      })}

      <div className="multicity-form__action">
        <div className="multicity-form__select">
          <PassangerSelect />
        </div>

        <div className="multicity-form__add-btn">
          <SimpleButton
            second
            title="+ добавить перелёт"
            onClick={handleClickAddSegment}
            disabled={segmentsCount > 5}
          />
        </div>

        <div className="multicity-form__search-btn">
          <SimpleButton submit accent title="Найти" />
        </div>
      </div>
    </form>
  );
};

export default AviaMultiForm;
