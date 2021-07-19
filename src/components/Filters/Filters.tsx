import React, { SetStateAction, useCallback, useState } from 'react';

import { CurrencyType } from '../../redux/reducers/settings';
import { TicketsList } from '../../utils/convertTickets';

import TransferFilter from './TransferFilter';
import PriceFilter from './PriceFilter';
import AirlineFilter from './AirlineFilter';
import Panel from '../Panel';

import './Filters.scss';

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

export type ActivePriceFilters = Record<'minPrice' | 'maxPrice', number>;

const Filters = ({
  activeTransfersFilters,
  activeAirlinesFilters,
  onActiveTransfersFilters,
  onActivePriceFilters,
  onActiveAirlinesFilters,
  currency,
}: FiltersProps): JSX.Element => {
  const [openFiltersList, setOpenFiltersList] = useState<TicketsList>([]);

  const handleToggleActiveFilterItem = useCallback(
    (id: string) => {
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

  return (
    <Panel className="filters">
      <div className="filters__header">
        <h3 className="filters__title">Фильтры</h3>

        <button type="button" className="filters__button-clear-all">
          очистить всё
        </button>
      </div>

      <TransferFilter
        isOpen={openFiltersList.includes('transferFilter')}
        onToggle={handleToggleActiveFilterItem}
        activeFilters={activeTransfersFilters}
        onSetActiveFilters={onActiveTransfersFilters}
      />

      <PriceFilter
        isOpen={openFiltersList.includes('priceFilter')}
        onToggle={handleToggleActiveFilterItem}
        onSetActiveFilters={onActivePriceFilters}
        currency={currency}
      />

      <AirlineFilter
        isOpen={openFiltersList.includes('airlineFilter')}
        onToggle={handleToggleActiveFilterItem}
        activeFilters={activeAirlinesFilters}
        onSetActiveFilters={onActiveAirlinesFilters}
      />
    </Panel>
  );
};

export default Filters;
