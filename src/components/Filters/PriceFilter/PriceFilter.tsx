import React, { useCallback, useEffect } from 'react';

import { CurrencyType } from '../../../redux/reducers/settings';

import getCurrencySymbolCharCode from '../../../utils/getCurrencySymbolCharCode';
import FilterItem from '../FilterItem';
import SliderRange from '../../SliderRange';
import { ActivePriceFilters, OpenFiltersType } from '../Filters';

type PriceFilterProps = {
  isOpen: boolean;
  onToggle: (id: OpenFiltersType) => void;
  currency: CurrencyType;
  onSetActiveFilters: (filters: ActivePriceFilters) => void;
  min: number;
  max: number;
  minCurrentPriceValue: number;
  maxCurrentPriceValue: number;
  onMinCurrentPriceValue: (value: number) => void;
  onMaxCurrentPriceValue: (value: number) => void;
};

const PriceFilter = ({
  isOpen,
  onToggle,
  currency,
  onSetActiveFilters,
  min,
  max,
  minCurrentPriceValue,
  maxCurrentPriceValue,
  onMinCurrentPriceValue,
  onMaxCurrentPriceValue,
}: PriceFilterProps): JSX.Element => {
  const handleChangeMinPriceValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.min(+e.target.value, maxCurrentPriceValue - 1);
      onMinCurrentPriceValue(value);
    },
    [maxCurrentPriceValue, onMinCurrentPriceValue]
  );

  const handleChangeMaxPriceValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(+e.target.value, minCurrentPriceValue + 1);
      onMaxCurrentPriceValue(value);
    },
    [minCurrentPriceValue, onMaxCurrentPriceValue]
  );

  useEffect(() => {
    onSetActiveFilters({
      minPrice: minCurrentPriceValue,
      maxPrice: maxCurrentPriceValue,
    });
  }, [maxCurrentPriceValue, minCurrentPriceValue, onSetActiveFilters]);

  return (
    <FilterItem
      title="Цена билета"
      isActive={isOpen}
      onClick={() => onToggle('priceFilter')}
    >
      <SliderRange
        minRange={min}
        maxRange={max}
        minValue={minCurrentPriceValue}
        maxValue={maxCurrentPriceValue}
        onChangeMinValue={handleChangeMinPriceValue}
        onChangeMaxValue={handleChangeMaxPriceValue}
        leftValue={`от ${minCurrentPriceValue} ${getCurrencySymbolCharCode(
          currency
        )}`}
        rightValue={`от ${maxCurrentPriceValue} ${getCurrencySymbolCharCode(
          currency
        )}`}
        step={10}
      />
    </FilterItem>
  );
};

export default PriceFilter;
