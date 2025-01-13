import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SwCategory } from '../enums/enums';
import { ItemsSearchQueryType } from '../types/types';
import { getFirstPathNamePart } from '../utils/get-first-pathname-part';

const useParamsForItemsSearch = (): ItemsSearchQueryType => {
  const [queries] = useSearchParams();
  const category = getFirstPathNamePart();
  const search = queries.get('search');
  const page = queries.get('page');

  const urlParams = useMemo(
    () => ({
      category: category as SwCategory,
      search: search || '',
      page: page || '1',
    }),
    [category, search, page]
  );

  return urlParams;
};

export default useParamsForItemsSearch;
