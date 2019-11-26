/* eslint-disable global-require */
import { scientificToDecimal, estimationMaxFantomBalance } from './converts';

describe('scientificToDecimal correctly', () => {
  test('in scientific notation', () => {
    expect(scientificToDecimal('12.3e5')).toBe('1230000');
  });

  test('in scientific notation | a negative number', () => {
    expect(scientificToDecimal('12.3e-5')).toBe('0.0000123');
  });

  test('in any other case should return value too', () => {
    expect(scientificToDecimal('12.35')).toBe('12.35');
    expect(scientificToDecimal('other string')).toBe('other string');
    expect(scientificToDecimal(12.35)).toBe(12.35);
    expect(scientificToDecimal(null)).toBe(null);
    expect(scientificToDecimal(false)).toBe(false);
    expect(scientificToDecimal({})).toEqual({});
  });
});

describe('maximum balance that a user can send', () => {
  jest.unmock('mathjs');
  const math = require('mathjs');
  math.subtract = jest.fn((subtractor, number) => subtractor - number);
  math.bignumber = jest.fn(number => number);
  test('in correct', () => {
    expect(estimationMaxFantomBalance(4000000, 8)).toBe('0.000000000003999992');
  });
});
