import { FC, useEffect, useState } from 'react';
import SearchHeader from '../search-header/search-header';
import SearchResults from '../search-results/search-results';
import { Outlet } from 'react-router';
import { selectOptions } from '../../../constants/constants';
import { ItemsSearchQueryType } from '../../../types/types';
import useParamsForItemsSearch from '../../../hooks/use-params-for-items-search';
import useCategoryLoader from '../../../hooks/use-items-search';

const Search: FC = () => {
  const paramsForItemsSearch = useParamsForItemsSearch();
  const [searchQuery, setSearchQuery] = useState<ItemsSearchQueryType>(paramsForItemsSearch);
  const categoryLoader = useCategoryLoader(searchQuery);

  const handleSubmit = () => {
    setSearchQuery({ ...searchQuery });
  };

  useEffect(() => {
    setSearchQuery(paramsForItemsSearch);
  }, [paramsForItemsSearch]);

  const { search, category } = searchQuery;

  return (
    <>
      <SearchHeader
        options={selectOptions}
        initialCategory={category}
        initialSearch={search}
        onSubmit={handleSubmit}
      />
      <SearchResults {...categoryLoader} searchQuery={searchQuery} />
      <Outlet />
    </>
  );
};

export default Search;
