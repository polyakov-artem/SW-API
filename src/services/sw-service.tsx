import { TSavedSearch } from '../types/types';
import localStorageService from './local-storage-service';

const saveSearch = ({ category, search }: TSavedSearch) => {
  localStorageService.saveData('category', category);
  localStorageService.saveData('search', search);
};

const swService = {
  saveSearch,
};

export default swService;
