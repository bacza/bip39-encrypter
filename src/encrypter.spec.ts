import { createHash } from 'crypto';

import { Encrypter } from './encrypter.js';
import { WORDS } from './words.js';

const initInputs = [
  { password: 'HelloWorld', digits: 4, min: 1000, max: 9999, factor: 27 },
  { password: 'SuperSecret', digits: 5, min: 10000, max: 99999, factor: 343 },
  { password: 'Qwerty123', digits: 6, min: 100000, max: 999999, factor: 3507 },
];

const e2eInputs = [
  { password: 'HelloWorld', digits: 4 },
  { password: 'SuperSecret', digits: 5 },
  { password: 'Qwerty123', digits: 6 },
];

const wordInputs = WORDS;

const getHash = (password: string) =>
  createHash('sha256').update(password).digest();

describe('Encrypter initialization', () => {
  describe.each(initInputs)(
    'Encrypter initialization: %s',
    ({ password, digits, min, max, factor }) => {
      let enc: Encrypter;

      beforeAll(() => {
        enc = new Encrypter(password, digits);
      });

      it('should have valid codes', () => {
        expect(enc['codes']).toStrictEqual(Array.from(getHash(password)));
      });

      it('should have valid digits', () => {
        expect(enc['digits']).toBe(digits);
      });

      it('should have valid min', () => {
        expect(enc['min']).toBe(min);
      });

      it('should have valid max', () => {
        expect(enc['max']).toBe(max);
      });

      it('should have valid factor', () => {
        expect(enc['factor']).toBe(factor);
      });
    }
  );
});

describe('Encrypter E2E', () => {
  describe.each(e2eInputs)('Encrypter E2E: %s', ({ password, digits }) => {
    const wordCases = wordInputs.map((word, index) => {
      const seq = index % 24;
      return { seq, word };
    });

    let enc: Encrypter;

    beforeAll(() => {
      enc = new Encrypter(password, digits);
    });

    test.each(wordCases)('E2E word test: %s', ({ seq, word }) => {
      const encrypted = enc.encryptWord(word, seq);
      const decrypted = enc.decryptWord(encrypted, seq);

      expect(typeof encrypted).toBe('string');
      expect(typeof decrypted).toBe('string');

      expect(encrypted).toMatch(/^[0-9]+$/);
      expect(decrypted).toMatch(/^[a-z]+$/);

      expect(decrypted).toBe<string>(word);
    });
  });
});
