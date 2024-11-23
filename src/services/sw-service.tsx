import { CategoryItemType, EndpointsResponsesType, SavedSearchType } from '../types/types';
import httpService from './http-service';
import localStorageService from './local-storage-service';

export type SearchParamsType<T> = {
  category: T;
  search?: string;
  page?: string;
  signal?: AbortSignal;
};

export type FetchItemParamsType<T> = {
  category: T;
  itemId: string;
  signal?: AbortSignal;
};

async function search<T extends keyof EndpointsResponsesType>({
  category,
  signal,
  search,
  page,
}: SearchParamsType<T>) {
  const response = await httpService.get<EndpointsResponsesType[T]>(category, {
    params: {
      page,
      search,
    },
    signal,
  });
  return response.data;
}

async function fetchItem<T extends keyof CategoryItemType>({
  category,
  itemId,
  signal,
}: FetchItemParamsType<T>) {
  const response = await httpService.get<CategoryItemType[T]>(`${category}/${itemId}`, {
    signal,
  });
  return response.data;
}

const saveSearch = ({ category, search }: SavedSearchType) => {
  localStorageService.saveData('category', category);
  localStorageService.saveData('search', search);
};

const swService = {
  fetchItem,
  search,
  saveSearch,
};

export default swService;
