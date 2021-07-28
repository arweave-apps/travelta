import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CurrencyType } from '../../redux/reducers/settings';

import TransferFilter from './TransferFilter';
import PriceFilter from './PriceFilter';
import AirlineFilter from './AirlineFilter';
import Panel from '../Panel';

import './Filters.scss';
import { getFiltersLimits } from '../../selectors/selectors';
import getNounDeclension from '../../utils/getNounDeclension';

type FiltersProps = {
  activeTransfersFilters: number[];
  activeAirlinesFilters: string[];
  onActiveTransfersFilters: React.Dispatch<SetStateAction<number[]>>;
  onActivePriceFilters: React.Dispatch<
    SetStateAction<ActivePriceFilters | null>
  >;
  onActiveAirlinesFilters: React.Dispatch<SetStateAction<string[]>>;
  currency: CurrencyType;
};

export type TransferCheckboxsDataType = {
  id: string;
  label: string;
  value: number;
};

export type ActivePriceFilters = Record<'minPrice' | 'maxPrice', number>;

export type OpenFiltersType =
  | 'transferFilter'
  | 'priceFilter'
  | 'airlineFilter';

const Filters = ({
  activeTransfersFilters,
  activeAirlinesFilters,
  onActiveTransfersFilters,
  onActivePriceFilters,
  onActiveAirlinesFilters,
  currency,
}: FiltersProps): JSX.Element => {
  const [openFiltersList, setOpenFiltersList] = useState<OpenFiltersType[]>([]);
  const { transfersRange, priceRange, airlines } = useSelector(
    getFiltersLimits
  );

  const [minCurrentPriceValue, setMinCurrentPriceValue] = useState<number>(
    priceRange.minPrice
  );

  const [maxCurrentPriceValue, setMaxCurrentPriceValue] = useState<number>(
    priceRange.maxPrice
  );

  const [transferCheckboxes, setTransferCheckboxes] = useState<
    TransferCheckboxsDataType[]
  >([]);

  useEffect(() => {
    const checkboxesData = [];

    for (let num = transfersRange.min; num <= transfersRange.max; num++) {
      const label =
        num === 0
          ? 'без пересадок'
          : `${num} ${getNounDeclension(num, [
              'пересадка',
              'пересадки',
              'пересадок',
            ])}`;

      const checkboxData = {
        id: `${num}-transfer-checkbox`,
        label,
        value: num,
      };

      checkboxesData.push(checkboxData);
    }

    setTransferCheckboxes(checkboxesData);
  }, [transfersRange.max, transfersRange.min]);

  const handleToggleActiveFilterItem = useCallback(
    (id: OpenFiltersType) => {
      const idx = openFiltersList.indexOf(id);

      if (idx === -1) {
        setOpenFiltersList([...openFiltersList, id]);
      } else {
        setOpenFiltersList([
          ...openFiltersList.slice(0, idx),
          ...openFiltersList.slice(idx + 1),
        ]);
      }
    },
    [openFiltersList]
  );

  const handleClearAllFilters = () => {
    onActiveTransfersFilters(
      transferCheckboxes.map((checkbox) => checkbox.value)
    );
    onActivePriceFilters({
      minPrice: priceRange.minPrice,
      maxPrice: priceRange.maxPrice,
    });
    setMinCurrentPriceValue(priceRange.minPrice);
    setMaxCurrentPriceValue(priceRange.maxPrice);
    onActiveAirlinesFilters([...airlines]);
  };

  return (
    <Panel className="filters">
      <div className="filters__header">
        <h3 className="filters__title">Фильтры</h3>

        <button
          type="button"
          className="filters__button-clear-all"
          onClick={handleClearAllFilters}
        >
          очистить всё
        </button>
      </div>

      <TransferFilter
        isOpen={openFiltersList.includes('transferFilter')}
        onToggle={handleToggleActiveFilterItem}
        activeFilters={activeTransfersFilters}
        onSetActiveFilters={onActiveTransfersFilters}
        checkboxes={transferCheckboxes}
      />

      <PriceFilter
        isOpen={openFiltersList.includes('priceFilter')}
        onToggle={handleToggleActiveFilterItem}
        onSetActiveFilters={onActivePriceFilters}
        currency={currency}
        min={priceRange.minPrice}
        max={priceRange.maxPrice}
        minCurrentPriceValue={minCurrentPriceValue}
        maxCurrentPriceValue={maxCurrentPriceValue}
        onMinCurrentPriceValue={setMinCurrentPriceValue}
        onMaxCurrentPriceValue={setMaxCurrentPriceValue}
      />

      <AirlineFilter
        isOpen={openFiltersList.includes('airlineFilter')}
        onToggle={handleToggleActiveFilterItem}
        activeFilters={activeAirlinesFilters}
        onSetActiveFilters={onActiveAirlinesFilters}
        airlines={airlines}
      />
    </Panel>
  );
};

export default Filters;
