import { capitalizeWord } from '../capitalize-word';

describe('capitalizeWord', () => {
  describe('when string is passed', () => {
    test('should return a string with the first letter in uppercase', () => {
      const str = 'hello';
      const expected = 'Hello';

      expect(capitalizeWord(str)).toBe(expected);
    });
  });
});
