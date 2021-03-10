const namesOfMonths = [
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

type Month = {
  monthName: string;
  numberDays: Array<number | undefined>;
};

const getMonthData = (year: number, month: number): Month => {
  const firstMonthDayIdx = new Date(`${year}-0${month + 1}-01`).getDay() - 1;
  const numberOfMonthDays = new Date(year, month + 1, 0).getDate();

  const missedDays: Array<undefined> = Array.from({ length: firstMonthDayIdx });

  const monthCalendarDates = Array.from({
    length: numberOfMonthDays,
  }).map((_, i) => i + 1);

  const numberDays = [...missedDays, ...monthCalendarDates];
  const monthName = namesOfMonths[month];

  return {
    monthName,
    numberDays,
  };
};

export default getMonthData;
