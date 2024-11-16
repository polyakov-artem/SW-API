import { FC } from 'react';
import Loader from '../../shared/loader/loader';
import './search-results.scss';
import { LoaderState } from '../../../utils/load-data';
import { CorrectResponseDataType } from '../../../types/types';

const SearchResults: FC<LoaderState<CorrectResponseDataType>> = ({ data, status, error }) => {
  const content = ((status) => {
    const cases = {
      idle: null,
      loading: <Loader className="search-results__loader" />,
      error: <h2>Error occurred while loading: {error}</h2>,
      success: data?.count ? JSON.stringify(data) : <h2>No items was found</h2>,
    };

    return cases[status];
  })(status);

  return <div className="search-results">{content}</div>;
};

export default SearchResults;
