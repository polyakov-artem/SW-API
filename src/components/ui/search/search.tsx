import { FC, useCallback, useEffect, useRef, useState } from 'react';
import SearchHeader from '../search-header/search-header';
import SearchResults from '../search-results/search-results';
import { Outlet } from 'react-router';
import { selectOptions } from '../../../constants/constants';
import {
  CANCELED_REQUEST_MESSAGE,
  getLoadingState,
  loadData,
  LoaderState,
} from '../../../utils/load-data';
import { CorrectResponseDataType, ItemsSearchQueryType } from '../../../types/types';
import useParamsForItemsSearch from '../../../hooks/use-params-for-items-search';
import swService from '../../../services/sw-service';

type CategoryLoaderStateType = LoaderState<CorrectResponseDataType>;

const Search: FC = () => {
  const paramsForItemsSearch = useParamsForItemsSearch();
  const [categoryLoader, setCategoryLoader] = useState<CategoryLoaderStateType>(getLoadingState);
  const [searchQuery, setSearchQuery] = useState<ItemsSearchQueryType>(paramsForItemsSearch);

  const handleSubmit = () => {
    setSearchQuery({ ...searchQuery });
  };

  const abortRef = useRef(new AbortController());
  const isMountedRef = useRef(false);

  const searchItems = useCallback(async ({ search, category, page }: ItemsSearchQueryType) => {
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
    setSearchQuery(paramsForItemsSearch);
  }, [paramsForItemsSearch]);

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

  const { search, category } = searchQuery;

  return (
    <>
      <SearchHeader
        options={selectOptions}
        initialCategory={category}
        initialSearch={search}
        onSubmit={handleSubmit}
      />
      <SearchResults {...categoryLoader} category={category} />
      <Outlet />
    </>
  );
};

export default Search;
