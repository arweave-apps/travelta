const getNounDeclension = (number: number, nouns: string[]): string => {
  const str = String(number);
  const lastNum = Number(str[str.length - 1]);

  if (lastNum === 1) {
    return nouns[0];
  }

  if (lastNum > 1 && lastNum < 5) {
    return nouns[1];
  }

  return nouns[2];
};

export default getNounDeclension;
