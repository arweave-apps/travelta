import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../../hooks/useInput';

import { addSegment } from '../../../redux/actions/aviaParams/aviaParams';
import { RootStateType } from '../../../redux/reducers';

import TextInput from '../../TextInput';
import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import Datepicker from '../../Datepicker';

import './AviaMultiForm.scss';

const AviaMultiForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const origin = useInput('');
  const destination = useInput('');

  const segments = useSelector(
    (state: RootStateType) => state.aviaParams.segments
  );

  const handleClickAddSegment = useCallback(() => {
    if (segments.length > 5) {
      return;
    }
    dispatch(addSegment());
  }, [dispatch, segments.length]);

  return (
    <form className="multicity-form">
      {segments.map((segment) => {
        const { id } = segment;

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
              <Datepicker segment={segment} />
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
    </form>
  );
};

export default AviaMultiForm;
