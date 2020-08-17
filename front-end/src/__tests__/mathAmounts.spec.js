import { sumAmounts, multipleAmounts } from '../utils/mathAmounts';

describe('sum of amounts in accounting format.', () => {
  it('passes "34", returns "34.00"', () => {
    const value = '34';
    expect(sumAmounts(value)).toBe('34.00');
  })
  it('passes 34, returns "34.00"', () => {
    const value = 34.23;
    expect(sumAmounts(value)).toBe('34.23');
  })
  it('passes false, returns ".00"', () => {
    const value = false;
    expect(sumAmounts(value)).toBe('.00');
  })
  it('passes undefined, returns ".00"', () => {
    const value = undefined;
    expect(sumAmounts(value)).toBe('.00');
  })
  it('passes "0", return ".00"', () => {
    const value1 = '0';
    expect(sumAmounts(value1)).toBe('.00');
  })
  it('passes ".07", returns ".07"', () => {
    const value = '.07'
    expect(sumAmounts(value)).toBe('.07');
  })
  it('passes "307", returns "307.00', () => {
    const value = '307'
    expect(sumAmounts(value)).toBe('307.00');
  })
  it('passes "4.07", returns "4.07"', () => {
    const value = '4.07'
    expect(sumAmounts(value)).toBe('4.07');
  })
  it('passes "-.07", returns "-.07', () => {
    const value = '-.07'
    expect(sumAmounts(value)).toBe('-.07');
  })
  it('passes "0.07", returns ".07"', () => {
    const value = '0.07'
    expect(sumAmounts(value)).toBe('.07');
  })
  it('passes "1,0.07", returns "10.07"', () => {
    const value = '1,0.07'
    expect(sumAmounts(value)).toBe('10.07');
  })
  it('passes "10.07" and ".08", returns "10.15"', () => {
    const value1 = '10.07'
    const value2 = '.08'
    expect(sumAmounts(value1, value2)).toBe('10.15');
  })
  it('passes "10.07" and "-.08", returns "9.99"', () => {
    const value1 = '10.07'
    const value2 = '-.08'
    expect(sumAmounts(value1, value2)).toBe('9.99');
  })
  it('passes "210,000.07" and "800,080.00", returns "1,010,080.07"', () => {
    const value1 = '210,000.07'
    const value2 = '800,080.00'
    expect(sumAmounts(value1, value2)).toBe('1,010,080.07');
  })
  it('passes undefined and "7.00", returns "7.00"', () => {
    const value1 = undefined;
    const value2 = '7.00';
    expect(sumAmounts(value1, value2)).toBe('7.00');
  })
})

describe('multiple of amounts in accounting format.', () => {
  it('passes "2.00" and "49.99", returns "99.98"', () => {
    const value1 = '2.00'
    const value2 = '49.99'
    expect(multipleAmounts(value1, value2)).toBe('99.98');
  })
  it('passes "2.00" and undefined, returns "0.00"', () => {
    const value1 = '2.00'
    const value2 = undefined
    expect(multipleAmounts(value1, value2)).toBe('.00');
  })
})