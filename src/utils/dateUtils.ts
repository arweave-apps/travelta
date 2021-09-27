export const getFormattedStringDate = (date: Date): string => {
  const shortWeekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  const monthsNames = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];

  const dateNum = date.getDate();
  const month = monthsNames[date.getMonth()];
  const year = date.getFullYear();
  const day = shortWeekDays[date.getDay()];

  return `${dateNum} ${month} ${year}, ${day}`;
};

export const getFormattedStringShortDate = (date: Date): string => {
  const shortWeekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  const shortMonthsNames = [
    'янв',
    'фев',
    'мар',
    'апр',
    'мая',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];

  const dateNum = date.getDate();
  const month = shortMonthsNames[date.getMonth()];
  const day = shortWeekDays[date.getDay()];

  return `${dateNum} ${month}, ${day}`;
};

export const getFormattedStringTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return minutes < 10 ? `${hours}:0${minutes}` : `${hours}:${minutes}`;
};

export const getFormatedTimeFromSeconds = (seconds: number): string => {
  const hours = seconds / 3600;
  const hour = Math.trunc(hours);
  const decimal = hours - hour;

  if (decimal === 0) {
    return `${hour}ч`;
  }

  const minutes = Math.trunc((decimal * 3600) / 60);

  return `${hour}ч ${minutes}мин`;
};

export const msToTime = (ms: number): string => {
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  const formatedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formatedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${formatedHours}:${formatedMinutes}`;
};

export const msFromTime = (hours: number, minutes: number): number => {
  return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
};
