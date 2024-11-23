import { getClassNames } from '../getClassNames';

describe('getClassNames', () => {
  describe('when baseClass is passed', () => {
    const baseClass = 'element';
    const expected = baseClass;

    test(`should return "${expected}"`, () => {
      const result = getClassNames({ baseClass });

      expect(result).toBe(expected);
    });
  });

  describe('when baseClass, mix are passed', () => {
    const baseClass = 'element';
    const mix = 'parent__element';
    const expected = `${baseClass} ${mix}`;

    test(`should return "${expected}"`, () => {
      const result = getClassNames({ baseClass, mix });

      expect(result).toBe(expected);
    });
  });

  describe('when baseClass, mix, classMods are passed', () => {
    const baseClass = 'element';
    const mix = 'parent__element';
    const classMods = {
      size: 's',
      selected: true,
      disabled: true,
      filtered: false,
      ignored: undefined,
    };
    const expected = `${baseClass} ${baseClass}_size_s ${baseClass}_selected ${baseClass}_disabled ${mix}`;

    test(`should return "${expected}"`, () => {
      const result = getClassNames({ baseClass, mix, classMods });

      expect(result).toBe(expected);
    });
  });
});
