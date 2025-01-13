import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { SwCategory } from '../enums/enums';
import { TItemQuery } from '../types/types';
import { getFirstPathNamePart } from '../utils/get-first-pathname-part';

const useParamsForItemFetch = (): TItemQuery => {
  const { itemId } = useParams();
  const category = getFirstPathNamePart();

  const urlParams = useMemo(
    () => ({
      category: category as SwCategory,
      itemId: itemId || '',
    }),
    [category, itemId]
  );

  return urlParams;
};

export default useParamsForItemFetch;
