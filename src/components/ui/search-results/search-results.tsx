import { FC, useEffect, useState } from 'react';
import Loader from '../../shared/loader/loader';
import './search-results.scss';
import { LoaderState, LoadingStatus } from '../../../utils/load-data';
import { CorrectResponseDataType, ItemsSearchQueryType } from '../../../types/types';
import { capitalizeWord } from '../../../utils/capitalize-word';
import ResultsList from '../results-list/results-list';
import Pagination from '../../shared/pagination/pagination';

type SearchResultsPropsType = LoaderState<CorrectResponseDataType> & {
  searchQuery: ItemsSearchQueryType;
};

const SearchResults: FC<SearchResultsPropsType> = ({ data, status, error, searchQuery }) => {
  const [prevData, setPrevData] = useState(data);
  const [prevCategory, setPrevCategory] = useState(searchQuery.category);

  useEffect(() => {
    if (searchQuery.category !== prevCategory) {
      setPrevCategory(searchQuery.category);
      setPrevData(data);
      return;
    }
    if (status === LoadingStatus.success) {
      setPrevData(data);
    }
  }, [searchQuery, prevCategory, data, status]);

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

  return (
    <div className="search-results">
      <Pagination
        className="search-results__pagination"
        totalCount={prevData?.count}
        perPageCount={10}
        currentPageParam={searchQuery.page}
        numOfVisibleButtons={7}
      />
      <div className="search-results__list-container">{content}</div>
    </div>
  );
};

export default SearchResults;
