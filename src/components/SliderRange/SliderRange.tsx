import React, { useRef, useState } from 'react';

import classNames from 'classnames';

import { CurrencyType } from '../../redux/reducers/settings';

import getCurrencySymbolCharCode from '../../utils/getCurrencySymbolCharCode';

import './SliderRange.scss';

type SliderRangeProps = { min: number; max: number; currency: CurrencyType };

const SliderRange = ({ max, min, currency }: SliderRangeProps): JSX.Element => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const rangeRef = useRef<HTMLDivElement>(null);
  const minValueRef = useRef(min);
  const maxValueRef = useRef(max);

  const getPercent = (value: number) => {
    return Math.round(((value - min) / (max - min)) * 100);
  };

  return (
    <div className="slider-range">
      <label className="slider-range__label" htmlFor="input-range-left">
        <input
          className={classNames(
            'slider-range__input',
            'slider-range__input--left',
            {
              'slider-range__input--above': minValue > max - 100,
            }
          )}
          id="input-range-left"
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={(e) => {
            const value = Math.min(+e.target.value, maxValue - 1);

            setMinValue(value);

            if (rangeRef.current) {
              rangeRef.current.style.left = `${getPercent(minValue)}%`;
              rangeRef.current.style.width = `${
                getPercent(maxValueRef.current) - getPercent(minValue)
              }%`;
            }

            minValueRef.current = value;
          }}
        />
      </label>

      <label className="slider-range__label" htmlFor="input-range-right">
        <input
          className="slider-range__input slider-range__input--right"
          id="input-range-right"
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={(e) => {
            const value = Math.max(+e.target.value, minValue + 1);

            setMaxValue(value);

            if (rangeRef.current) {
              rangeRef.current.style.width = `${
                getPercent(maxValue) - getPercent(minValueRef.current)
              }%`;
            }

            maxValueRef.current = value;
          }}
        />
      </label>

      <div className="slider">
        <div className="slider__track" />
        <div className="slider__range" ref={rangeRef} />

        <div className="slider__info">
          <div className="slider__info-value">
            от {minValue}
            {getCurrencySymbolCharCode(currency)}
          </div>
          <div className="slider__info-value">
            до {maxValue}
            {getCurrencySymbolCharCode(currency)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderRange;
