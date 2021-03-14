export const isPastDay = (comparisonDate: Date): boolean => {
  const now = new Date();

  if (comparisonDate < now) {
    return true;
  }
  return false;
};

export const isActive = (comparisonDate: Date, date: Date | null): boolean => {
  if (date) {
    return date.getTime() === comparisonDate.getTime();
  }

  return false;
};

export const isFilledRightHalfCell = (
  comparisonDate: Date,
  startDate: Date | null,
  hoverDate: Date | null,
  endDate: Date | null
): boolean => {
  // красит вправо активный день при наведении
  if (
    startDate &&
    hoverDate &&
    startDate < hoverDate &&
    comparisonDate.getTime() === startDate.getTime()
  ) {
    return true;
  }

  if (
    endDate &&
    hoverDate &&
    endDate < hoverDate &&
    comparisonDate.getTime() === endDate.getTime()
  ) {
    return true;
  }

  // красит вправо активный день когда есть обе даты
  if (
    startDate &&
    endDate &&
    startDate < endDate &&
    comparisonDate.getTime() === startDate.getTime()
  ) {
    return true;
  }

  return false;
};

export const isFilledLeftHalfCell = (
  comparisonDate: Date,
  startDate: Date | null,
  hoverDate: Date | null,
  endDate: Date | null
): boolean => {
  // красит влево активный день при наведении на даты
  if (
    startDate &&
    hoverDate &&
    startDate > hoverDate &&
    comparisonDate.getTime() === startDate.getTime()
  ) {
    return true;
  }

  if (
    endDate &&
    hoverDate &&
    endDate > hoverDate &&
    comparisonDate.getTime() === endDate.getTime()
  ) {
    return true;
  }

  // красит влево активный день когда есть даты начала и конца
  if (
    startDate &&
    endDate &&
    startDate < endDate &&
    comparisonDate.getTime() === endDate.getTime()
  ) {
    return true;
  }

  return false;
};

export const isFilled = (
  comparisonDate: Date,
  startDate: Date | null,
  hoverDate: Date | null,
  endDate: Date | null
): boolean => {
  // красит когда есть обе даты
  if (
    startDate &&
    endDate &&
    startDate < comparisonDate &&
    comparisonDate < endDate
  ) {
    return true;
  }

  // красит при наведении
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
