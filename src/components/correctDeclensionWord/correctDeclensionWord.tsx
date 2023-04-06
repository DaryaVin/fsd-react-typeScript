import React from 'react';

interface CorrectDeclensionWordProps {
  options: {
    1: string,
    2: string,
    5: string,
  },
  value: number,
}
export const correctDeclensionWord = ({options, value}: CorrectDeclensionWordProps) => {
  if (value >= 11 && value <= 19) return options[5];
  const remainder = value % 10;
  switch (remainder) {
    case 1: return options[1];
    case 2:
    case 3:
    case 4: return options[2];
    default: return options[5];
  }
}
