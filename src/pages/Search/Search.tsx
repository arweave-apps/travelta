import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  getCurrency,
  getTickets,
  getTicketsList,
  getTicketsLoading,
} from '../../selectors/selectors';

import Prediction from '../../components/Prediction';
import SearchAction from '../../components/SearchAction';
import Ticket from '../../components/Ticket';
import Filters from '../../components/Filters';
import Loader from '../../components/Loader';

import './Search.scss';

const Search = (): JSX.Element => {
  const currency = useSelector(getCurrency);
  const ticketsList = useSelector(getTicketsList);
  const tickets = useSelector(getTickets);
  const isTicketsLoading = useSelector(getTicketsLoading);

  const [visibleTicketList, setVisibleTicketList] = useState<string[]>([]);

  useEffect(() => {
    setVisibleTicketList(ticketsList);
  }, [ticketsList]);

  if (isTicketsLoading) {
    return <Loader />;
  }

  if (ticketsList.length === 0) {
    return <div>Ничего не найдено =( Попробуйте изменить параметры поиска</div>;
  }

  return (
    <section className="avia-search">
      <div className="container-small">
        <div className="avia-search__inner">
          <Filters
            ticketsList={ticketsList}
            tickets={tickets}
            onSetVisibleTicketList={setVisibleTicketList}
            currency={currency}
          />
          <Prediction />
          <SearchAction totalTickets={visibleTicketList.length} />

          <div className="tickets">
            {visibleTicketList.length > 0 ? (
              visibleTicketList.map((ticketId) => {
                return (
                  <Ticket
                    key={ticketId}
                    ticket={tickets[ticketId]}
                    currency={currency}
                  />
                );
              })
            ) : (
              <div>Выберите хотябы один фильтр</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
