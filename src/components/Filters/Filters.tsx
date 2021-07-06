import React, { useCallback, useEffect, useState } from 'react';

import { CurrencyType } from '../../redux/reducers/settings';
import {
  ConvertedTickets,
  TicketsWithSegments,
} from '../../utils/convertTickets';

import TransferFilter from './TransferFilter';
import PriceFilter from './PriceFilter';

import './Filters.scss';
import trunsfersInTicket from '../../utils/ticketsUtils';

type FiltersProps = {
  ticketsList: string[];
  tickets: ConvertedTickets;
  onSetVisibleTicketList: (ticketList: string[]) => void;
  currency: CurrencyType;
};

export type ActivePriceFilters = Record<'minPrice' | 'maxPrice', number>;

const Filters = ({
  ticketsList,
  tickets,
  onSetVisibleTicketList,
  currency,
}: FiltersProps): JSX.Element => {
  const [openFiltersList, setOpenFiltersList] = useState<string[]>([]);

  const [activeTransfersFilters, setActiveTransfersFilters] = useState<
    number[]
  >([]);

  const [
    activePriceFilters,
    setActivePriceFilters,
  ] = useState<ActivePriceFilters | null>(null);

  useEffect(() => {
    const filterByTransfers = (ticket: TicketsWithSegments) => {
      const { segments } = ticket;

      const maxTrunsfersInTicket = Math.max(...trunsfersInTicket(segments));
      const minTrunsfersInTicket = Math.min(...trunsfersInTicket(segments));

      return (
        activeTransfersFilters.includes(maxTrunsfersInTicket) ||
        activeTransfersFilters.includes(minTrunsfersInTicket)
      );
    };

    const filterByPrice = (ticket: TicketsWithSegments) => {
      const { price } = ticket;

      return (
        activePriceFilters &&
        price <= activePriceFilters?.maxPrice &&
        price >= activePriceFilters?.minPrice
      );
    };

    const visibleTickets = ticketsList.filter((ticketId) => {
      const ticket = tickets[ticketId];

      return filterByTransfers(ticket) && filterByPrice(ticket);
    });

    onSetVisibleTicketList(visibleTickets);
  }, [
    activePriceFilters,
    activeTransfersFilters,
    onSetVisibleTicketList,
    tickets,
    ticketsList,
  ]);

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
