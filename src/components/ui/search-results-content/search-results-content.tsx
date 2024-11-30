import { FC } from 'react';
import { CategoryLoaderAndSearchQueryType } from '../../../types/types';
import { LoadingStatus } from '../../../utils/load-data';
import Loader from '../../shared/loader/loader';
import ResultsList from '../results-list/results-list';
import { capitalizeWord } from '../../../utils/capitalize-word';

const SearchResultsContent: FC<CategoryLoaderAndSearchQueryType> = ({
  categoryLoader,
  searchQuery,
}) => {
  const { data, error, status } = categoryLoader;

  if (status === LoadingStatus.loading) return <Loader fullSpace={true} size="lg" />;

  if (status === LoadingStatus.error) return <h2>Error occurred while loading: {error}</h2>;

  if (status === LoadingStatus.success && data?.count && data.results)
    return <ResultsList items={data.results} searchQuery={searchQuery} />;

  return (
    <h2>
      No results were found for the "{searchQuery.search}" query in the "
      {capitalizeWord(searchQuery.category)}" category
    </h2>
  );
};

export default SearchResultsContent;
