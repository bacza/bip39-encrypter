import { createHash } from 'crypto';

import { WORDS } from './words.js';
import * as V from './validations.js';

export class Encrypter {
  private readonly codes: number[];
  private readonly digits: number;
  private readonly min: number;
  private readonly max: number;
  private readonly range: number;
  private readonly factor: number;

  constructor(password: string, digits: number) {
    if (!V.isPasswordValid(password)) throw new Error('INVALID_PASSWORD');
    if (!V.isDigitsValid(digits)) throw new Error('INVALID_DIGITS');
    if (!V.isWordListValid(WORDS)) throw new Error('INVALID_WORD_LIST');

    this.codes = Array.from(createHash('sha256').update(password).digest());
    this.digits = digits;
    this.min = Math.pow(10, this.digits - 1);
    this.max = Math.pow(10, this.digits) - 1;
    this.range = this.max - this.min - 2048;
    this.factor = Math.floor(this.range / 256);
  }

  encryptWord(word: string, seq: number): string {
    const idx = WORDS.indexOf(word);

    if (!V.isWordIdxValid(idx)) throw new Error('INVALID_WORD');
    if (!V.isWordSeqValid(seq)) throw new Error('INVALID_SEQUENCE');

    const code = this.codes[seq];
    const offset = code * this.factor;
    const output = idx + offset + this.min;

    return String(output);
  }

  decryptWord(word: string, seq: number): string {
    const output = +word;

    if (!V.isString(word) || !V.isInteger(output))
      throw new Error('INVALID_WORD');

    if (!V.isIntegerBetween(output, this.min, this.max))
      throw new Error('INVALID_RANGE');

    if (!V.isWordSeqValid(seq)) throw new Error('INVALID_SEQUENCE');

    const code = this.codes[seq];
    const offset = code * this.factor;
    const idx = output - offset - this.min;

    if (!V.isWordIdxValid(idx)) throw new Error('INVALID_WORD');

    return WORDS[idx];
  }
}
