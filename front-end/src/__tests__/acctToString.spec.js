/**
 * Convert an accouting number from database to a number-string 
 * in correct format for showing to users.
 * Example: 938398 should return 9,383.98
 */

import { acctToString } from '../utils/acctToString';

describe('convert integer accounting number store in database to a accoungting format string', () => {
  it('passes 938398, returns "9,383.98"', () => {
    const value = 938398;
    expect(acctToString(value)).toBe('9,383.98');
  })
  it('passes 7, returns ".07"', () => {
    const value = 7;
    expect(acctToString(value)).toBe('.07');
  })
  it('passes 70, returns ".70"', () => {
    const value = 70;
    expect(acctToString(value)).toBe('.70');
  })
  it('passes 0, returns ".00"', () => {
    const value = 0;
    expect(acctToString(value)).toBe('.00');
  })
  it('passes "dsfds", returns "-"', () => {
    const value = "dsfds";
    expect(acctToString(value)).toBe('-');
  })
  it('passes 3434938398, returns "34,349,383.98"', () => {
    const value = 3434938398;
    expect(acctToString(value)).toBe('34,349,383.98');
  })
})
  