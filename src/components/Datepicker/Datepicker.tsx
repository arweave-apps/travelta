import React from 'react';
import CalendarPicker from '../CalendarPicker';
import TextInput from '../TextInput';

import './Datepicker.scss';

const Datepicker = (): JSX.Element => {
  return (
    <div className="datepicker">
      <div className="datepicker__depart">
        <TextInput placeholder="Когда" id="depart" readonly />
      </div>

      <div className="datepicker__return">
        <TextInput placeholder="Обратно" id="return" readonly />
      </div>

      <CalendarPicker />
    </div>
  );
};

export default Datepicker;
