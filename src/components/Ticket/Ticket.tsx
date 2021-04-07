import React from 'react';

import ShareIcon from '../../assets/images/icons/share.svg';
import LikeIcon from '../../assets/images/icons/like.svg';
import HandbagIcon from '../../assets/images/icons/handbag.svg';
import SuitcaseIcon from '../../assets/images/icons/suitcase.svg';

import SimpleButton from '../SimpleButton';

import './Ticket.scss';

const Ticket = (): JSX.Element => {
  return (
    <div className="ticket">
      <div className="ticket__left">
        <div className="ticket__body">
          <div className="ticket__airlines">
            <img src="https://images.kiwi.com/airlines/64/DP.png" alt="" />
          </div>
          <div className="ticket__route">
            <div className="ticket__departure">
              <div className="ticket__time">22:00</div>
              <div className="ticket__city">Киев</div>
              <div className="ticket__date">3 марта 2021, ср</div>
            </div>

            <div className="ticket__plane">
              <div className="ticket__duration">В пути 4ч 20м</div>

              <div className="ticket__timeline">
                <div className="ticket__point-wrapepr">
                  <div className="ticket__point" />
                  <div className="ticket__point" />
                </div>
              </div>

              <div className="ticket__citycode">
                <div className="ticket__citycode-departure">KBT</div>
                <div className="ticket__citycode-arrival">SVX</div>
              </div>
            </div>

            <div className="ticket__arrival">
              <div className="ticket__time">22:00</div>
              <div className="ticket__city">Киев</div>
              <div className="ticket__date">3 марта 2021, ср</div>
            </div>
          </div>
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
          <SimpleButton title="Купить 12 000 ₽" accent />
        </div>
      </div>
    </div>
  );
};

export default Ticket;
