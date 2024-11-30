import './search.scss';
import { FC, useEffect, useState } from 'react';
import SearchHeader from '../search-header/search-header';
import SearchResults from '../search-results/search-results';
import { Outlet, useParams } from 'react-router';
import { selectOptions } from '../../../constants/constants';
import { ItemsSearchQueryType } from '../../../types/types';
import useParamsForItemsSearch from '../../../hooks/use-params-for-items-search';
import useCategoryLoader from '../../../hooks/use-items-search';
import classNames from 'classnames';
import { NOT_FOUND_MESSAGE } from '../../../utils/load-data';

const BASE_CLASS_NAME = 'search';
const searchWithDetailsClassName = `${BASE_CLASS_NAME}_has-details`;
const searchHeaderClassName = `${BASE_CLASS_NAME}__search-header`;

const Search: FC = () => {
  const paramsForItemsSearch = useParamsForItemsSearch();
  const [searchQuery, setSearchQuery] = useState<ItemsSearchQueryType>(paramsForItemsSearch);
  const categoryLoader = useCategoryLoader(searchQuery);
  const { itemId } = useParams();

  const searchClassNames = classNames(BASE_CLASS_NAME, 'container', {
    [searchWithDetailsClassName]: !!itemId,
  });

  const handleSubmit = () => {
    setSearchQuery({ ...searchQuery });
  };

  useEffect(() => {
    setSearchQuery(paramsForItemsSearch);
  }, [paramsForItemsSearch]);

  const { search, category } = searchQuery;

  if (categoryLoader.error === NOT_FOUND_MESSAGE) throw new Error(NOT_FOUND_MESSAGE);

  return (
    <div className={searchClassNames}>
      <SearchHeader
        className={searchHeaderClassName}
        options={selectOptions}
        initialCategory={category}
        initialSearch={search}
        onSubmit={handleSubmit}
      />
      <SearchResults {...categoryLoader} searchQuery={searchQuery} />
      <Outlet />
    </div>
  );
};

export default Search;
