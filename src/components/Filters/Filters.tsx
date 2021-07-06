import React, { useCallback, useEffect, useState } from 'react';

import { CurrencyType } from '../../redux/reducers/settings';
import { ConvertedTickets, TicketsList } from '../../utils/convertTickets';

import useFilters from './useFilters';

import TransferFilter from './TransferFilter';
import PriceFilter from './PriceFilter';

import './Filters.scss';

type FiltersProps = {
  ticketsList: TicketsList;
  tickets: ConvertedTickets;
  onSetVisibleTicketList: (ticketList: TicketsList) => void;
  currency: CurrencyType;
};

export type ActivePriceFilters = Record<'minPrice' | 'maxPrice', number>;

const Filters = ({
  ticketsList,
  tickets,
  onSetVisibleTicketList,
  currency,
}: FiltersProps): JSX.Element => {
  const [openFiltersList, setOpenFiltersList] = useState<TicketsList>([]);

  const [activeTransfersFilters, setActiveTransfersFilters] = useState<
    number[]
  >([]);

  const [
    activePriceFilters,
    setActivePriceFilters,
  ] = useState<ActivePriceFilters | null>(null);

  const visibleTickets = useFilters(
    activeTransfersFilters,
    activePriceFilters,
    ticketsList,
    tickets
  );

  useEffect(() => {
    onSetVisibleTicketList(visibleTickets);
  }, [onSetVisibleTicketList, visibleTickets]);

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
    <div className="filters">
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
        onSetActiveFilters={setActiveTransfersFilters}
      />

      <PriceFilter
        isOpen={openFiltersList.includes('priceFilter')}
        onToggle={handleToggleActiveFilterItem}
        onSetActiveFilters={setActivePriceFilters}
        currency={currency}
      />
    </div>
  );
};

export default Filters;
