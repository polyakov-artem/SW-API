import { useState, useRef, useCallback, useEffect } from 'react';
import swService from '../services/sw-service';
import { CategoryItemType } from '../types/types';
import {
  getLoadingState,
  loadData,
  CANCELED_REQUEST_MESSAGE,
  LoaderState,
} from '../utils/load-data';
import { SwCategory } from '../enums/enums';

type itemLoaderStateType = LoaderState<CategoryItemType[SwCategory]>;

const useItemLoader = (category: SwCategory, itemId: string) => {
  const [itemLoader, setItemLoader] = useState<itemLoaderStateType>(getLoadingState);

  const abortRef = useRef(new AbortController());
  const isMountedRef = useRef(false);

  const fetchItem = useCallback(async (category: SwCategory, itemId: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setItemLoader(getLoadingState);

    const nextLoaderState = await loadData(() =>
      swService.fetchItem({
        category,
        itemId,
        signal: controller.signal,
      })
    );

    if (!isMountedRef.current || nextLoaderState.error === CANCELED_REQUEST_MESSAGE) return;

    setItemLoader(nextLoaderState);
  }, []);

  useEffect(() => {
    fetchItem(category, itemId);
  }, [fetchItem, category, itemId]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  return itemLoader;
};

export default useItemLoader;
