import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SwCategory } from '../enums/enums';
import { ItemsSearchQueryType } from '../types/types';

const useParamsForItemsSearch = (): ItemsSearchQueryType => {
  const [queries] = useSearchParams();
  const { category } = useParams();
  const search = queries.get('search');
  const page = queries.get('page');

  const urlParams = useMemo(
    () => ({
      category: category && category in SwCategory ? (category as SwCategory) : SwCategory.films,
      search: search || '',
      page: page || '1',
    }),
    [category, search, page]
  );

  return urlParams;
};

export default useParamsForItemsSearch;
