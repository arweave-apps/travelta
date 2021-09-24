import React, { useCallback, useEffect } from 'react';
import { CurrencyType } from '../../../redux/reducers/settings';
import getCurrencySymbolCharCode from '../../../utils/getCurrencySymbolCharCode';
import SliderRange from '../../SliderRange';
import FilterItem from '../FilterItem';
import { ActivePriceFilters, OpenFiltersType } from '../Filters';

type TicketTimeFilterProps = {
  title: string;
  id: OpenFiltersType;
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

const TicketTimeFilter = ({
  title,
  id,
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
}: TicketTimeFilterProps): JSX.Element => {
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
    <FilterItem title={title} isActive={isOpen} onClick={() => onToggle(id)}>
      <SliderRange
        minRange={min}
        maxRange={max}
        minValue={minCurrentPriceValue}
        maxValue={maxCurrentPriceValue}
        onChangeMinPice={handleChangeMinPriceValue}
        onChangeMaxPrice={handleChangeMaxPriceValue}
        leftValue="Отправление"
        rightValue={`от ${maxCurrentPriceValue} ${getCurrencySymbolCharCode(
          currency
        )}`}
      />

      <SliderRange
        minRange={min}
        maxRange={max}
        minValue={minCurrentPriceValue}
        maxValue={maxCurrentPriceValue}
        onChangeMinPice={handleChangeMinPriceValue}
        onChangeMaxPrice={handleChangeMaxPriceValue}
        leftValue="Прибытие"
        rightValue={`от ${maxCurrentPriceValue} ${getCurrencySymbolCharCode(
          currency
        )}`}
      />
    </FilterItem>
  );
};

export default TicketTimeFilter;
