import { FC } from 'react';
import Loader from '../../shared/loader/loader';
import './search-results.scss';
import { LoaderState } from '../../../utils/load-data';
import { CorrectResponseDataType, ItemsSearchQueryType } from '../../../types/types';
import { capitalizeWord } from '../../../utils/capitalize-word';
import ResultsList from '../results-list/results-list';

type SearchResultsPropsType = LoaderState<CorrectResponseDataType> & {
  searchQuery: ItemsSearchQueryType;
};

const SearchResults: FC<SearchResultsPropsType> = ({ data, status, error, searchQuery }) => {
  const content = ((status) => {
    const cases = {
      idle: null,
      loading: <Loader className="search-results__loader" />,
      error: <h2>Error occurred while loading: {error}</h2>,
      success:
        data?.count && data.results ? (
          <ResultsList items={data.results} searchQuery={searchQuery} />
        ) : (
          <h2>No items was found in category "{capitalizeWord(searchQuery.category)}"</h2>
        ),
    };

    return cases[status];
  })(status);

  return <div className="search-results">{content}</div>;
};

export default SearchResults;
