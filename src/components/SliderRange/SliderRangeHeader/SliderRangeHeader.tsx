import React from 'react';

type SliderRangeProps = {
  leftValue: string;
  rightValue: string;
};

const SliderRangeHeader = ({
  leftValue,
  rightValue,
}: SliderRangeProps): JSX.Element => {
  return (
    <div className="slider-info">
      <span className="slider-info__value">{leftValue}</span>
      <span className="slider-info__value">{rightValue}</span>
    </div>
  );
};

export default SliderRangeHeader;
