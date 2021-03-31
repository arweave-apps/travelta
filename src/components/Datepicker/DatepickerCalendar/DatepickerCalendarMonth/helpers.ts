export const isPastDay = (comparisonDate: Date): boolean => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const day = now.getDate();

  return comparisonDate < new Date(year, month, day, 0, 0, 0);
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

  // красит правую половину у startDate, если выбранны обе даты
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

  // красит левую половину у endDate, если выбранны обе даты
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
