import { SwCategory } from '../../enums/enums';
import localStorageService from '../../services/local-storage-service';
import { loadSavedSearch } from '../load-saved-search';

describe('loadSavedSearch', () => {
  describe('when localStorage is empty', () => {
    test('should return {category: null, search: null}', () => {
      vi.spyOn(localStorageService, 'getData').mockImplementation(() => null);

      expect(loadSavedSearch()).toEqual({ category: null, search: null });
    });
  });

  describe('when category and search are stored correctly', () => {
    test('should return valid category and search', () => {
      const savedCategory = SwCategory.people;
      const savedSearch = 'luke';

      vi.spyOn(localStorageService, 'getData').mockImplementation((key) => {
        if (key === 'category') return savedCategory;
        if (key === 'search') return savedSearch;
        return null;
      });

      expect(loadSavedSearch()).toEqual({ category: savedCategory, search: savedSearch });
    });
  });

  describe('when stored category is not in SwCategory enum', () => {
    test('return null category', () => {
      const savedCategory = 'electronics';
      const savedSearch = 'luke';

      vi.spyOn(localStorageService, 'getData').mockImplementation((key) => {
        if (key === 'category') return savedCategory;
        if (key === 'search') return savedSearch;
        return null;
      });

      expect(loadSavedSearch()).toEqual({ category: null, search: savedSearch });
    });
  });

  describe('when stored search is not a string', () => {
    test('return null search', () => {
      const savedCategory = SwCategory.people;
      const savedSearch = {} as string;

      vi.spyOn(localStorageService, 'getData').mockImplementation((key) => {
        if (key === 'category') return savedCategory;
        if (key === 'search') return savedSearch;
        return null;
      });

      expect(loadSavedSearch()).toEqual({ category: savedCategory, search: null });
    });
  });
});
