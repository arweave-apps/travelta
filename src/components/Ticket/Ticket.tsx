import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { CurrencyType } from '../../redux/reducers/settings';

import getNounDeclension from '../../utils/getNounDeclension';
import { TicketsWithSegments } from '../../utils/convertTickets';
import getCurrencySymbolCharCode from '../../utils/getCurrencySymbolCharCode';

import {
  getFormatedTimeFromSeconds,
  getFormattedStringDate,
  getFormattedStringTime,
} from './helpers';

import DownArrowIcon from '../../assets/images/icons/down-arrow.svg';
import HandbagIcon from '../../assets/images/icons/handbag.svg';
import LikeIcon from '../../assets/images/icons/like.svg';
import ShareIcon from '../../assets/images/icons/share.svg';
import SuitcaseIcon from '../../assets/images/icons/suitcase.svg';

import SimpleButton from '../SimpleButton';
import Panel from '../Panel';

import './Ticket.scss';

type TicketProps = {
  ticket: TicketsWithSegments;
  currency: CurrencyType;
};

const Ticket = ({ ticket, currency }: TicketProps): JSX.Element => {
  return (
    <Panel className="ticket">
      <div className="ticket__left">
        <div className="ticket__body">
          <div className="ticket__airlines">
            {ticket.airlines.length > 0 &&
              ticket.airlines.map((airline) => {
                return (
                  <img
                    key={uuidv4()}
                    src={`https://images.kiwi.com/airlines/64/${airline}.png`}
                    alt="airline"
                  />
                );
              })}
          </div>

          {ticket.segments.map(({ id, flights, duration, transfers }) => {
            const startPoint = flights[0];
            const endPoint = flights[flights.length - 1];
            const departureDate = new Date(startPoint.departure.date);
            const arrivalDate = new Date(endPoint.arrival.date);

            return (
              <div className="ticket__route" key={id}>
                <div className="ticket__departure">
                  <div className="ticket__time">
                    {getFormattedStringTime(departureDate)}
                  </div>

                  <div className="ticket__cityname">
                    {startPoint.departure.city}
                  </div>

                  <div className="ticket__date">
                    {getFormattedStringDate(departureDate)}
                  </div>
                </div>

                <div className="ticket__plane">
                  <div className="ticket__duration">
                    В пути {getFormatedTimeFromSeconds(duration)}
                  </div>

                  <div className="ticket__timeline">
                    <div className="ticket__point-wrapepr">
                      {transfers.length > 0 && (
                        <div className="ticket__point" />
                      )}
                    </div>
                  </div>

                  <div className="ticket__citycodes">
                    <div className="ticket__citycodes-item">
                      {startPoint.departure.code}
                    </div>

                    {transfers.length > 0 ? (
                      <div className="ticket__citycodes-item">{`${
                        transfers.length
                      } ${getNounDeclension(transfers.length, [
                        'пересадка',
                        'пересадки',
                        'пересадок',
                      ])}`}</div>
                    ) : (
                      <div className="ticket__citycodes-item">
                        без пересадок
                      </div>
                    )}

                    <div className="ticket__citycodes-item">
                      {endPoint.arrival.code}
                    </div>
                  </div>
                </div>

                <div className="ticket__arrival">
                  <div className="ticket__time">
                    {getFormattedStringTime(arrivalDate)}
                  </div>

                  <div className="ticket__cityname">
                    {endPoint.arrival.city}
                  </div>

                  <div className="ticket__date">
                    {getFormattedStringDate(arrivalDate)}
                  </div>
                </div>
              </div>
            );
          })}
          {/* ticket__route */}
        </div>
      </div>

      <div className="ticket__right">
        <div className="ticket__social">
          <ShareIcon className="ticket__share" />
          <LikeIcon className="ticket__like" />
        </div>

        <div className="ticket__baggage">
          <div className="ticket__handbag">
            <HandbagIcon className="ticket__handbag-icon" />
            <span>1 место ручной клади до 10 кг</span>
          </div>

          <div className="ticket__suitcase">
            <SuitcaseIcon className="ticket__suitcase-icon" />
            <span>нет багажа</span>
          </div>
        </div>

        <div className="ticket__buy-btn">
          <SimpleButton link={ticket.deep_link} bg="accent">
            Купить {ticket.price}
            {getCurrencySymbolCharCode(currency)}
          </SimpleButton>
        </div>
      </div>

      <button type="button" className="ticket__expand-btn">
        <DownArrowIcon />
      </button>
    </Panel>
  );
};

export default Ticket;
