export const isString = (val: string) => typeof val === 'string';

export const isInteger = (val: number) => Number.isInteger(val);

export const isIntegerBetween = (val: number, min: number, max: number) =>
  isInteger(val) && val >= min && val <= max;

export const isPasswordValid = (val: string) =>
  isString(val) && val.length >= 8;

export const isDigitsValid = (val: number) => isIntegerBetween(val, 4, 6);

export const isWordSeqValid = (val: number) => isIntegerBetween(val, 0, 23);

export const isWordIdxValid = (val: number) => isIntegerBetween(val, 0, 2047);

export const isWordListValid = (list: string[]) =>
  Array.isArray(list) && list.every(isString) && list.length === 2048;
