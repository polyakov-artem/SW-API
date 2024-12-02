import { getPaginationRange, NUMBERS_PLACEHOLDER } from './get-pagination-range';

describe('getPaginationRange', () => {
  describe('when numberOfPages is less than or equal to numOfVisibleButtons', () => {
    test('should return all page numbers', () => {
      const result = getPaginationRange({
        numberOfPages: 5,
        numOfVisibleButtons: 7,
        currentPage: 3,
      });

      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('when current page is 3 and total number is 10', () => {
    test('should return correct range with placeholder for left side without dots', () => {
      const result = getPaginationRange({
        numberOfPages: 10,
        numOfVisibleButtons: 7,
        currentPage: 3,
      });

      expect(result).toEqual([1, 2, 3, 4, 5, NUMBERS_PLACEHOLDER, 10]);
    });
  });

  describe('when current page is 9 and total number is 10', () => {
    test('should return correct range with placeholder for right side without dots', () => {
      const result = getPaginationRange({
        numberOfPages: 10,
        numOfVisibleButtons: 7,
        currentPage: 8,
      });

      expect(result).toEqual([1, NUMBERS_PLACEHOLDER, 6, 7, 8, 9, 10]);
    });
  });

  describe('when current page is 5 and total number is 10', () => {
    test('should return correct range with placeholders on both sides', () => {
      const result = getPaginationRange({
        numberOfPages: 10,
        numOfVisibleButtons: 7,
        currentPage: 5,
      });

      expect(result).toEqual([1, NUMBERS_PLACEHOLDER, 4, 5, 6, NUMBERS_PLACEHOLDER, 10]);
    });
  });
});
