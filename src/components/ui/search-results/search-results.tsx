import { FC } from 'react';
import Loader from '../../shared/loader/loader';
import './search-results.scss';
import { LoaderState } from '../../../utils/load-data';
import { CorrectResponseDataType } from '../../../types/types';
import { SwCategory } from '../../../enums/enums';
import { capitalizeWord } from '../../../utils/capitalize-word';
import ResultsList from '../results-list/results-list';

type SearchResultsPropsType = LoaderState<CorrectResponseDataType> & { category: SwCategory };

const SearchResults: FC<SearchResultsPropsType> = ({ data, status, error, category }) => {
  const content = ((status) => {
    const cases = {
      idle: null,
      loading: <Loader className="search-results__loader" />,
      error: <h2>Error occurred while loading: {error}</h2>,
      success:
        data?.count && data.results ? (
          <ResultsList items={data.results} category={category} />
        ) : (
          <h2>No items was found in category "{capitalizeWord(category)}"</h2>
        ),
    };

    return cases[status];
  })(status);

  return <div className="search-results">{content}</div>;
};

export default SearchResults;
