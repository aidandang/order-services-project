/** 
 * Convert a number-string with 2 decimal to an integer.
 * The value return is 100 times compare to the original.
 * This function is for accounting purpose to save numbers in database as integers instead of floats.
 * Example: the string "2,349.99" will be coverted to number in database: 234999, but the real amount is 2,349.99
 * 
 * Note: We are not simple using Number() function because of converting issues of Number() method.
 * Sometimes when we convert 2,349.98 using Number(), it returns 2,349.97999999999999.  
*/

import { acctNumber } from '../utils/acctNumber';

describe('convert a number-string with 2 decimal to an integer number.', () => {
  it('passes undefined, returns 0', () => {
    const value = undefined;
    expect(acctNumber(value)).toBe(0);
  }) 
  it('passes "07", returns 0', () => {
    const value = "07";
    expect(acctNumber(value)).toBe(0);
  }) 
  it('passes ".07", returns 7', () => {
    const value = ".07";
    expect(acctNumber(value)).toBe(7);
  })
  it('passes "0.07", returns 0', () => {
    const value = "0.07";
    expect(acctNumber(value)).toBe(7);
  }) 
  it('passes "36.99", returns 3699', () => {
    const value = "36.99";
    expect(acctNumber(value)).toBe(3699);
  })
  it('passes "3699", returns 3699', () => {
    const value = "3699";
    expect(acctNumber(value)).toBe(0);
  })
  it('passes "3,475,336.99", returns 347533699', () => {
    const value = "3,475,336.99";
    expect(acctNumber(value)).toBe(347533699);
  })
  it('passes "0", returns 0', () => {
    const value = "0";
    expect(acctNumber(value)).toBe(0);
  })
  it('passes "-5,455.594", returns 0', () => {
    const value = "-5,455.594";
    expect(acctNumber(value)).toBe(0);
  })
  it('passes "5,455.594", returns 0', () => {
    const value = "5,455.594";
    expect(acctNumber(value)).toBe(0);
  }) 
  it('passes "543.bc", returns 0', () => {
    const value = "543.bc";
    expect(acctNumber(value)).toBe(0);
  })      
});

describe('convert 3 or more number-strings with 2 decimal, convert to integer numbers then sum them up.', () => {
  it('passes "0.07", "36.99" and "3987.99" returns 402505', () => {
    const value1 = "0.07";
    const value2 = "36.99";
    const value3 = "3,987.99";
    expect(acctNumber(value1, value2, value3)).toBe(402505);
  });
  it('passes 5 "0.07", "0", "fdsfdsfs", "-4,554.67" and "3987.99", returns 402505', () => {
    const value1 = "0.07";
    const value2 = "0";
    const value3 = "fdsfdsfs";
    const value4 = "-4,554.67";
    const value5 = "3,987.99";
    expect(acctNumber(value1, value2, value3, value4, value5)).toBe(398806);
  });
})

