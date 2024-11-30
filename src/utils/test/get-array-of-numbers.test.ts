import { getArrayOfNumbers } from '../get-array-of-numbers';

describe('getArrayOfNumbers', () => {
  describe('when start number and end number are passed', () => {
    test('should return correct array for range (1 to 9)', () => {
      const result = getArrayOfNumbers(1, 9);

      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });
});
