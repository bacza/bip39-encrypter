import * as V from './validations.js';

describe('Test validation helpers', () => {
  describe('Test isString', () => {
    const cases = [
      { input: '', result: true },
      { input: '10', result: true },
      { input: 'hello', result: true },
      { input: null, result: false },
    ];

    test.each(cases)('isString: %s', ({ input, result }) => {
      expect(V.isString(input as string)).toBe(result);
    });
  });

  describe('Test isInteger', () => {
    const cases = [
      { input: 10, result: true },
      { input: 1.5, result: false },
      { input: '10', result: false },
      { input: 'Hello', result: false },
      { input: null, result: false },
    ];

    test.each(cases)('isInteger: %s', ({ input, result }) => {
      expect(V.isInteger(input as number)).toBe(result);
    });
  });

  describe('Test isIntegerBetween', () => {
    const cases = [
      { input: 10, min: 1, max: 10, result: true },
      { input: 1.5, min: 1, max: 10, result: false },
      { input: '10', min: 1, max: 10, result: false },
      { input: 'Hello', min: 1, max: 10, result: false },
      { input: null, min: 1, max: 10, result: false },
    ];

    test.each(cases)('isIntegerBetween: %s', ({ input, min, max, result }) => {
      expect(V.isIntegerBetween(input as number, min, max)).toBe(result);
    });
  });

  describe('Test isPasswordValid', () => {
    const cases = [
      { input: '', result: false },
      { input: 'Hello', result: false },
      { input: 'HelloWorld', result: true },
    ];

    test.each(cases)('isPasswordValid: %s', ({ input, result }) => {
      expect(V.isPasswordValid(input)).toBe(result);
    });
  });

  describe('Test isDigitsValid', () => {
    const cases = [...Array(100)].map((_, idx) => ({
      input: idx,
      result: idx >= 4 && idx <= 6,
    }));

    test.each(cases)('isDigitsValid: %s', ({ input, result }) => {
      expect(V.isDigitsValid(input)).toBe(result);
    });
  });

  describe('Test isWordSeqValid', () => {
    const cases = [...Array(100)].map((_, idx) => ({
      input: idx,
      result: idx >= 0 && idx < 24,
    }));

    test.each(cases)('isWordSeqValid: %s', ({ input, result }) => {
      expect(V.isWordSeqValid(input)).toBe(result);
    });
  });

  describe('Test isWordIdxValid', () => {
    const cases = [...Array(3000)].map((_, idx) => ({
      input: idx,
      result: idx >= 0 && idx < 2048,
    }));

    test.each(cases)('isWordIdxValid: %s', ({ input, result }) => {
      expect(V.isWordIdxValid(input)).toBe(result);
    });
  });

  describe('Test isWordListValid', () => {
    const cases = [...Array(10)].map((_, idx) => ({
      input: [...Array(2045 + idx)].fill('word'),
      result: 2045 + idx === 2048,
    }));

    test.each(cases)('isWordListValid: %s', ({ input, result }) => {
      expect(V.isWordListValid(input)).toBe(result);
    });
  });
});
