import { DisabledDatesType } from '../../../redux/reducers/pageSettings';

export const shortWeekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const monthsNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const getMonthDates = (
  year: number,
  month: number
): Array<number | undefined> => {
  const monthStartsOn = new Date(`${year}-0${month + 1}-01`).getDay();
  const numberOfMonthDays = new Date(year, month + 1, 0).getDate();

  const missedDays: Array<undefined> = Array.from({
    length: monthStartsOn - 1,
  });

  const datesOfMonth = Array.from({
    length: numberOfMonthDays,
  }).map((_, i) => i + 1);

  return [...missedDays, ...datesOfMonth];
};

export const isPastDay = (
  comparisonDate: Date,
  disabledDates: DisabledDatesType
): boolean => {
  if (!disabledDates.before || !disabledDates.after) {
    return false;
  }

  return (
    comparisonDate < disabledDates.before ||
    comparisonDate > disabledDates.after
  );
};

export const isSelectedDay = (
  comparisonDate: Date,
  date: Date | null
): boolean => {
  if (!date) {
    return false;
  }

  return date.getTime() === comparisonDate.getTime();
};

export const isFilledRightHalfCell = (
  comparisonDate: Date,
  startDate: Date | null,
  hoverDate: Date | null,
  endDate: Date | null
): boolean => {
  // красит правую половину у startDate
  if (startDate && hoverDate && !endDate) {
    return (
      startDate < hoverDate && comparisonDate.getTime() === startDate.getTime()
    );
  }

  // красит правую половину у endDate
  if (endDate && hoverDate && !startDate) {
    return (
      endDate < hoverDate && comparisonDate.getTime() === endDate.getTime()
    );
  }

  // красит правую половину у startDate, если выбраны обе даты
  if (!startDate || !endDate) {
    return false;
  }

  return (
    startDate < endDate && comparisonDate.getTime() === startDate.getTime()
  );
};

export const isFilledLeftHalfCell = (
  comparisonDate: Date,
  startDate: Date | null,
  hoverDate: Date | null,
  endDate: Date | null
): boolean => {
  // красит левую половину у startDate
  if (startDate && hoverDate && !endDate) {
    return (
      startDate > hoverDate && comparisonDate.getTime() === startDate.getTime()
    );
  }

  // красит левую половину у endDate
  if (endDate && hoverDate && !startDate) {
    return (
      endDate > hoverDate && comparisonDate.getTime() === endDate.getTime()
    );
  }

  // красит левую половину у endDate, если выбраны обе даты
  if (!startDate || !endDate) {
    return false;
  }

  return startDate < endDate && comparisonDate.getTime() === endDate.getTime();
};

export const isFilled = (
  comparisonDate: Date,
  startDate: Date | null,
  hoverDate: Date | null,
  endDate: Date | null
): boolean => {
  // красит промежуток между датами
  if (
    startDate &&
    endDate &&
    startDate < comparisonDate &&
    comparisonDate < endDate
  ) {
    return true;
  }

  // красит ячейки при наведении
  if (startDate && hoverDate) {
    if (comparisonDate > startDate && comparisonDate < hoverDate) {
      return true;
    }

    if (comparisonDate < startDate && comparisonDate > hoverDate) {
      return true;
    }
  }

  if (endDate && hoverDate) {
    if (comparisonDate > endDate && comparisonDate < hoverDate) {
      return true;
    }

    if (comparisonDate < endDate && comparisonDate > hoverDate) {
      return true;
    }
  }

  return false;
};
