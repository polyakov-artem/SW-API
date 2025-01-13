import { useState, useRef, useCallback, useEffect } from 'react';
import swService from '../services/sw-service';
import { TGetItemsResponsesMap, TItemsQuery } from '../types/types';
import {
  getLoadingState,
  loadData,
  CANCELED_REQUEST_MESSAGE,
  LoaderState,
} from '../utils/load-data';
import { SwCategory } from '../enums/enums';

export type TCategoryLoaderState = LoaderState<TGetItemsResponsesMap[SwCategory]>;

const useCategoryLoader = (searchQuery: TItemsQuery) => {
  const [categoryLoader, setCategoryLoader] = useState<TCategoryLoaderState>(getLoadingState);

  const abortRef = useRef(new AbortController());
  const isMountedRef = useRef(false);

  const searchItems = useCallback(async ({ search, category, page }: TItemsQuery) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setCategoryLoader(getLoadingState);

    const nextLoaderState = await loadData(() =>
      swService.search({
        search,
        category,
        page,
        signal: controller.signal,
      })
    );

    if (!isMountedRef.current || nextLoaderState.error === CANCELED_REQUEST_MESSAGE) return;

    setCategoryLoader(nextLoaderState);
  }, []);

  useEffect(() => {
    searchItems(searchQuery);
  }, [searchItems, searchQuery]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  return categoryLoader;
};

export default useCategoryLoader;
