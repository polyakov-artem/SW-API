import { useMemo } from 'react';
import { loadSavedSearch } from '../utils/load-saved-search';
import { TItemsQuery } from '../types/types';

export const useSavedSearch = (): TItemsQuery | null => {
  return useMemo(() => {
    const { category, search } = loadSavedSearch();

    if (category) {
      return {
        category,
        search: search || '',
        page: '1',
      };
    }

    return null;
  }, []);
};
