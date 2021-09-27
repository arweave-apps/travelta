/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useRef } from 'react';

import classNames from 'classnames';

import './SliderRange.scss';
import SliderRangeHeader from './SliderRangeHeader';

type SliderRangeProps = {
  minRange: number;
  maxRange: number;
  minValue: number;
  maxValue: number;
  leftValue: string;
  rightValue: string;
  onChangeMinValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMaxValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step: number;
};

const SliderRange = ({
  maxRange,
  minRange,
  minValue,
  maxValue,
  leftValue,
  rightValue,
  onChangeMinValue,
  onChangeMaxValue,
  step,
}: SliderRangeProps): JSX.Element => {
  const sliderRangeRef = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => {
      return Math.round(((value - minRange) / (maxRange - minRange)) * 100);
    },
    [maxRange, minRange]
  );

  useEffect(() => {
    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValue);

    if (sliderRangeRef.current) {
      sliderRangeRef.current.style.left = `${minPercent}%`;
      sliderRangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [getPercent, maxValue, minValue, sliderRangeRef]);

  useEffect(() => {
    const minPercent = getPercent(minValue);
    const maxPercent = getPercent(maxValue);

    if (sliderRangeRef.current) {
      sliderRangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [getPercent, maxValue, minValue, sliderRangeRef]);

  return (
    <div className="slider-wrapper">
      <SliderRangeHeader leftValue={leftValue} rightValue={rightValue} />

      <div className="slider-range">
        <label className="slider-range__label" htmlFor="input-range-left">
          <input
            className={classNames(
              'slider-range__input',
              'slider-range__input--left',
              {
                'slider-range__input--above': minValue > maxRange - 100,
              }
            )}
            id="input-range-left"
            type="range"
            min={minRange}
            max={maxRange}
            value={minValue}
            onChange={(e) => {
              onChangeMinValue(e);
            }}
            step={step}
          />
        </label>

        <label className="slider-range__label" htmlFor="input-range-right">
          <input
            className="slider-range__input slider-range__input--right"
            id="input-range-right"
            type="range"
            min={minRange}
            max={maxRange}
            value={maxValue}
            onChange={(e) => {
              onChangeMaxValue(e);
            }}
            step={step}
          />
        </label>

        <div className="slider">
          <div className="slider__track" />
          <div className="slider__interval" ref={sliderRangeRef} />
        </div>
      </div>
    </div>
  );
};

export default SliderRange;
