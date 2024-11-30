import { getSelector } from '../getSelector';

describe('getSelector', () => {
  describe('when className is passed', () => {
    test('should return a selector string', () => {
      const str = 'block';
      const expected = '.block';

      expect(getSelector(str)).toBe(expected);
    });
  });
});
