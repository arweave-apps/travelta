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
  monthData: Array<number | undefined>;
};

const getMonth = (year: number, month: number): Month => {
  const weekDayOfBeginningOfMonth =
    new Date(`${year}-0${month + 1}-01`).getDay() - 1;

  const numberOfMonthDays = new Date(year, month + 1, 0).getDate();

  const missedDays: Array<undefined> = Array.from({
    length: weekDayOfBeginningOfMonth,
  });

  const datesOfMonth = Array.from({
    length: numberOfMonthDays,
  }).map((_, i) => i + 1);

  const monthData = [...missedDays, ...datesOfMonth];
  const monthName = namesOfMonths[month];

  return {
    monthName,
    monthData,
  };
};

export default getMonth;
