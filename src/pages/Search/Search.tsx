import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import useFilters from './useFilters';

import ErrorCard from '../../components/ErrorCard';
import Filters from '../../components/Filters';
import Layout from '../../components/Layout';
import Loader from '../../components/Loader';
import Prediction from '../../components/Prediction';
import SearchAction from '../../components/SearchAction';
import Ticket from '../../components/Ticket';
import SimpleButton from '../../components/SimpleButton';

import {
  getCurrency,
  getPredictions,
  getTickets,
  getTicketsList,
  getTicketsLoading,
} from '../../selectors/selectors';

import './Search.scss';

export type ActivePriceFilters = Record<'minPrice' | 'maxPrice', number>;

const numberOfTicketsLoaded = 10;

const Search = (): JSX.Element => {
  const currency = useSelector(getCurrency);
  const ticketsList = useSelector(getTicketsList);
  const tickets = useSelector(getTickets);
  const isTicketsLoading = useSelector(getTicketsLoading);
  const predictions = useSelector(getPredictions);

  const [visibleTicketsCount, setVisibleTicketsCount] = useState<number>(1);

  const [activeTransfersFilters, setActiveTransfersFilters] = useState<
    number[]
  >([]);

  const [
    activePriceFilters,
    setActivePriceFilters,
  ] = useState<ActivePriceFilters | null>(null);

  const [activeAirlinesFilters, setActiveAirlinesFilters] = useState<string[]>(
    []
  );

  const visibleTickets = useFilters(
    activeTransfersFilters,
    activePriceFilters,
    activeAirlinesFilters,
    ticketsList,
    tickets
  );

  if (isTicketsLoading) {
    return (
      <Layout className="avia-search" containerSize="small" tag="section">
        <Loader />
      </Layout>
    );
  }

  if (ticketsList.length === 0) {
    return (
      <Layout className="avia-search" containerSize="small" tag="section">
        <ErrorCard
          title="Ничего не найдено"
          recommendation="Попробуйте изменить параметры поиска"
        />
      </Layout>
    );
  }

  const handleCLickVisibleTicketsCount = () => {
    setVisibleTicketsCount(visibleTicketsCount + 1);
  };

  const ticketsPerPage = numberOfTicketsLoaded * visibleTicketsCount;
  const isButtonDisabled = visibleTickets.length <= ticketsPerPage;

  return (
    <Layout className="avia-search" containerSize="small" tag="section">
      <div className="avia-search__inner">
        <Filters
          activeTransfersFilters={activeTransfersFilters}
          activeAirlinesFilters={activeAirlinesFilters}
          onActiveTransfersFilters={setActiveTransfersFilters}
          onActivePriceFilters={setActivePriceFilters}
          onActiveAirlinesFilters={setActiveAirlinesFilters}
          currency={currency}
        />

        {predictions.length > 0 && (
          <Prediction items={predictions} currency={currency} />
        )}

        <SearchAction totalTickets={visibleTickets.length} />

        <div className="tickets">
          {visibleTickets.length > 0 ? (
            visibleTickets.slice(0, ticketsPerPage).map((ticketId) => {
              return (
                <Ticket
                  key={ticketId}
                  ticket={tickets[ticketId]}
                  currency={currency}
                />
              );
            })
          ) : (
            <ErrorCard
              title="Установлены слишком жесткие фильтры"
              recommendation="Измените фильтры"
            />
          )}

          {visibleTickets.length > 0 && (
            <div className="tickets__btn">
              <SimpleButton
                bg="accent"
                onClick={handleCLickVisibleTicketsCount}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled
                  ? 'Показаны все доступные билеты'
                  : `Показать еще ${numberOfTicketsLoaded} билетов`}
              </SimpleButton>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
