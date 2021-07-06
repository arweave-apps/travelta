import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CurrencyType } from '../../../redux/reducers/settings';

import { getTicketsPriceRange } from '../../../selectors/selectors';

import FilterItem from '../FilterItem';
import SliderRange from '../../SliderRange';
import { ActivePriceFilters } from '../Filters';

type PriceFilterProps = {
  isOpen: boolean;
  onToggle: (id: string) => void;
  currency: CurrencyType;
  onSetActiveFilters: (filters: ActivePriceFilters) => void;
};

const PriceFilter = ({
  isOpen,
  onToggle,
  currency,
  onSetActiveFilters,
}: PriceFilterProps): JSX.Element => {
  const { minPrice, maxPrice } = useSelector(getTicketsPriceRange);

  const [minCurrentPriceValue, setMinCurrentPriceValue] = useState<number>(
    minPrice
  );
  const [maxCurrentPriceValue, setMaxCurrentPriceValue] = useState<number>(
    maxPrice
  );

  const handleChangeMinPriceValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Math.min(+e.target.value, maxCurrentPriceValue - 1);
    setMinCurrentPriceValue(value);
  };

  const handleChangeMaxPriceValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Math.max(+e.target.value, minCurrentPriceValue + 1);
    setMaxCurrentPriceValue(value);
  };

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
        minRange={minPrice}
        maxRange={maxPrice}
        minValue={minCurrentPriceValue}
        maxValue={maxCurrentPriceValue}
        currency={currency}
        onChangeMinPice={handleChangeMinPriceValue}
        onChangeMaxPrice={handleChangeMaxPriceValue}
      />
    </FilterItem>
  );
};

export default PriceFilter;
