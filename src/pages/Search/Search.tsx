/* eslint-disable no-console */
import React from 'react';
import { useSelector } from 'react-redux';

import { getTicketsList } from '../../selectors/selectors';

import Prediction from '../../components/Prediction';
import SearchAction from '../../components/SearchAction';
import Ticket from '../../components/Ticket';

import './Search.scss';

const Search = (): JSX.Element => {
  const ticketsList = useSelector(getTicketsList);

  if (ticketsList.length === 0) {
    return <div>Ничего не найдено =( Попробуйте изменить параметры поиска</div>;
  }

  return (
    <section className="avia-search">
      <div className="container-small">
        <div className="avia-search__inner">
          <div className="filters">filters</div>
          <Prediction />
          <SearchAction totalTickets={ticketsList.length} />

          <div className="tickets">
            {ticketsList.map((ticketId) => {
              return <Ticket key={ticketId} ticketId={ticketId} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
