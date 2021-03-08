import React from 'react';

import './CalendarPicker.scss';

const CalendarPicker = (): JSX.Element => {
  return (
    <div className="calendar">
      <div className="calendar__header">
        <span className="calendar__title">Выберите дату отправления</span>
        <button type="button" className="calendar__resest">
          Reset
        </button>
      </div>

      <div className="calendar__months">
        <div className="calendar__month">
          <div className="calendar__caption">Апрель</div>

          <div className="calendar__weekdays">
            <div className="calendar__weekday">Пн</div>
            <div className="calendar__weekday">Вт</div>
            <div className="calendar__weekday">Ср</div>
            <div className="calendar__weekday">Чт</div>
            <div className="calendar__weekday">Пт</div>
            <div className="calendar__weekday">Сб</div>
            <div className="calendar__weekday">Вс</div>
          </div>

          <div className="calendar__body">
            <div className="calendar__week">
              <div className="calendar__day">1</div>
              <div className="calendar__day">2</div>
              <div className="calendar__day">3</div>
              <div className="calendar__day">4</div>
              <div className="calendar__day">5</div>
              <div className="calendar__day">6</div>
              <div className="calendar__day">7</div>
            </div>

            <div className="calendar__week">
              <div className="calendar__day">8</div>
              <div className="calendar__day">9</div>
              <div className="calendar__day">10</div>
              <div className="calendar__day">11</div>
              <div className="calendar__day">12</div>
              <div className="calendar__day">13</div>
              <div className="calendar__day">14</div>
            </div>

            <div className="calendar__week">
              <div className="calendar__day">15</div>
              <div className="calendar__day">16</div>
              <div className="calendar__day">17</div>
              <div className="calendar__day">18</div>
              <div className="calendar__day">19</div>
              <div className="calendar__day">20</div>
              <div className="calendar__day">21</div>
            </div>

            <div className="calendar__week">
              <div className="calendar__day">22</div>
              <div className="calendar__day">23</div>
              <div className="calendar__day">24</div>
              <div className="calendar__day">25</div>
              <div className="calendar__day">26</div>
              <div className="calendar__day">27</div>
              <div className="calendar__day">28</div>
            </div>

            <div className="calendar__week">
              <div className="calendar__day">29</div>
              <div className="calendar__day">30</div>
              <div className="calendar__day">31</div>
            </div>
          </div>
        </div>

        <div className="calendar__month">
          <div className="calendar__caption">Апрель</div>

          <div className="calendar__weekdays">
            <div className="calendar__weekday">Пн</div>
            <div className="calendar__weekday">Вт</div>
            <div className="calendar__weekday">Ср</div>
            <div className="calendar__weekday">Чт</div>
            <div className="calendar__weekday">Пт</div>
            <div className="calendar__weekday">Сб</div>
            <div className="calendar__weekday">Вс</div>
          </div>

          <div className="calendar__body">
            <div className="calendar__week">
              <div className="calendar__day">1</div>
              <div className="calendar__day">2</div>
              <div className="calendar__day">3</div>
              <div className="calendar__day">4</div>
              <div className="calendar__day">5</div>
              <div className="calendar__day">6</div>
              <div className="calendar__day">7</div>
            </div>

            <div className="calendar__week">
              <div className="calendar__day">8</div>
              <div className="calendar__day">9</div>
              <div className="calendar__day">10</div>
              <div className="calendar__day">11</div>
              <div className="calendar__day">12</div>
              <div className="calendar__day">13</div>
              <div className="calendar__day">14</div>
            </div>

            <div className="calendar__week">
              <div className="calendar__day">15</div>
              <div className="calendar__day">16</div>
              <div className="calendar__day">17</div>
              <div className="calendar__day">18</div>
              <div className="calendar__day">19</div>
              <div className="calendar__day">20</div>
              <div className="calendar__day">21</div>
            </div>

            <div className="calendar__week">
              <div className="calendar__day">22</div>
              <div className="calendar__day">23</div>
              <div className="calendar__day">24</div>
              <div className="calendar__day">25</div>
              <div className="calendar__day">26</div>
              <div className="calendar__day">27</div>
              <div className="calendar__day">28</div>
            </div>

            <div className="calendar__week">
              <div className="calendar__day">29</div>
              <div className="calendar__day">30</div>
              <div className="calendar__day">31</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPicker;
