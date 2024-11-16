import { EndpointsResponsesType } from '../types/types';
import httpService from './http-service';

type SearchParamsType<T> = {
  category: T;
  search?: string;
  page?: string;
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
  return response;
}

const swService = {
  search,
};

export default swService;
