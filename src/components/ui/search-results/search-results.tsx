import { FC } from 'react';
import Loader from '../../shared/loader/loader';
import './search-results.scss';

const SearchResults: FC = () => {
  return (
    <div className="search-results">
      <Loader className="search-results__loader" />
    </div>
  );
};

export default SearchResults;
