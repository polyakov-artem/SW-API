import './search.scss';
import { FC } from 'react';
import SearchHeader from '../search-header/search-header';
import SearchResults from '../search-results/search-results';
import { Outlet, useParams } from 'react-router';
import { selectOptions } from '../../../constants/constants';
import useParamsForItemsSearch from '../../../hooks/use-params-for-items-search';
import useCategoryLoader from '../../../hooks/use-items-search';
import classNames from 'classnames';
import { NOT_FOUND_MESSAGE } from '../../../utils/load-data';

const BASE_CLASS_NAME = 'search';
const searchWithDetailsClassName = `${BASE_CLASS_NAME}_has-details`;
const searchHeaderClassName = `${BASE_CLASS_NAME}__search-header`;

const Search: FC = () => {
  const paramsForItemsSearch = useParamsForItemsSearch();
  const categoryLoader = useCategoryLoader(paramsForItemsSearch);
  const { itemId } = useParams();

  const searchClassNames = classNames(BASE_CLASS_NAME, 'container', {
    [searchWithDetailsClassName]: !!itemId,
  });

  const { search, category } = paramsForItemsSearch;

  if (categoryLoader.error === NOT_FOUND_MESSAGE) throw new Error(NOT_FOUND_MESSAGE);

  return (
    <div className={searchClassNames}>
      <SearchHeader
        className={searchHeaderClassName}
        options={selectOptions}
        initialCategory={category}
        initialSearch={search}
      />
      <SearchResults categoryLoader={categoryLoader} searchQuery={paramsForItemsSearch} />
      <Outlet />
    </div>
  );
};

export default Search;
