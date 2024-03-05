import { WORDS } from './words.js';

describe('Test WORDS list', () => {
  it('should be an array of 2048 items', () => {
    expect(WORDS).toBeInstanceOf(Array);
    expect(WORDS.length).toEqual(2048);
  });

  it('should be an array of strings', () => {
    const allGood = WORDS.every((item) => typeof item === 'string');
    expect(allGood).toBe(true);
  });

  it('should be an array of lowercase words', () => {
    const allGood = WORDS.every((item) => /^[a-z]+$/.test(item));
    expect(allGood).toBe(true);
  });

  it('should be an array of sorted words', () => {
    const sorted = [...WORDS].sort();
    expect(sorted).toStrictEqual(WORDS);
  });
});
