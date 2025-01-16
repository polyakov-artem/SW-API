import { FC } from 'react';
import Loader from '../../shared/loader/loader';
import ResultsList from '../results-list/results-list';
import { capitalizeWord } from '../../../utils/capitalize-word';
import { TItemsLoaderState } from '../../../store/items-loader-slice';
import useParamsForItemsSearch from '../../../hooks/use-params-for-items-search';

export type TSearchResultsContent = {
  itemsLoader: TItemsLoaderState;
};

const SearchResultsContent: FC<TSearchResultsContent> = ({ itemsLoader }) => {
  const { data, error, isLoading, isError } = itemsLoader;
  const searchQuery = useParamsForItemsSearch();

  if (isLoading) return <Loader classMods={{ ['full-space']: true, size: 'lg' }} />;

  if (isError) return <h2>Error occurred while loading: {error}</h2>;

  if (data?.results?.length) return <ResultsList items={data.results} searchQuery={searchQuery} />;

  return (
    <h2>
      No results were found for the "{searchQuery.search}" query in the "
      {capitalizeWord(searchQuery.category)}" category
    </h2>
  );
};

export default SearchResultsContent;
