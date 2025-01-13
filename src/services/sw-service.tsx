import { SwCategory } from '../enums/enums';
import {
  TFetchItemResponsesMap,
  TGetItemsResponsesMap,
  TItemsQuery,
  TSavedSearch,
  TItemQuery,
} from '../types/types';
import httpService from './http-service';
import localStorageService from './local-storage-service';

export type TSearchParams = TItemsQuery & {
  signal?: AbortSignal;
};

export type TFetchItemParams = TItemQuery & {
  signal?: AbortSignal;
};

async function search({ category, signal, search, page }: TSearchParams) {
  const response = await httpService.get<TGetItemsResponsesMap[SwCategory]>(category, {
    params: {
      page,
      search,
    },
    signal,
  });
  return response.data;
}

async function fetchItem({ category, itemId, signal }: TFetchItemParams) {
  const response = await httpService.get<TFetchItemResponsesMap[SwCategory]>(
    `${category}/${itemId}`,
    {
      signal,
    }
  );
  return response.data;
}

const saveSearch = ({ category, search }: TSavedSearch) => {
  localStorageService.saveData('category', category);
  localStorageService.saveData('search', search);
};

const swService = {
  fetchItem,
  search,
  saveSearch,
};

export default swService;
