const getMonthDates = (
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

export default getMonthDates;
