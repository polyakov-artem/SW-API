import { SwCategory } from '../enums/enums';
import localStorageService from '../services/local-storage-service';

export const loadSavedSearch = () => {
  let category = localStorageService.getData('category');
  let search = localStorageService.getData('search');

  if (!category || !(category in SwCategory)) {
    category = null;
  }

  if (!search || typeof search !== 'string') {
    search = null;
  }

  return { category, search };
};
