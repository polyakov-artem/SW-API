import { FC, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import './search-results.scss';
import { LoadingStatus } from '../../../utils/load-data';
import { CategoryLoaderAndSearchQueryType } from '../../../types/types';
import Pagination from '../../shared/pagination/pagination';
import { useLocation, useNavigate, useParams } from 'react-router';
import SearchResultsContent from '../search-results-content/search-results-content';

type SearchResultsPropsType = CategoryLoaderAndSearchQueryType;

const SearchResults: FC<SearchResultsPropsType> = ({ categoryLoader, searchQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId } = useParams();

  const paginationRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const loaderData = categoryLoader.data;
  const loaderStatus = categoryLoader.status;

  const [prevCategory, setPrevCategory] = useState(searchQuery.category);
  const [prevLoaderData, setPrevLoaderData] = useState(loaderData);

  useEffect(() => {
    if (searchQuery.category !== prevCategory) {
      setPrevCategory(searchQuery.category);
      setPrevLoaderData(loaderData);
      return;
    }
    if (loaderStatus === LoadingStatus.success) {
      setPrevLoaderData(loaderData);
    }
  }, [searchQuery.category, prevCategory, loaderData, loaderStatus]);

  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (
        itemId === undefined ||
        !paginationRef.current ||
        !contentRef.current ||
        paginationRef.current.contains(e.target as HTMLElement) ||
        contentRef.current.contains(e.target as HTMLElement)
      )
        return;

      navigate(`/${searchQuery.category}/${location.search}`, { relative: 'path' });
    },
    [navigate, searchQuery.category, location.search, itemId]
  );

  return (
    <div className="search-results" onClick={handleClick}>
      <div className="search-results__pagination-wrap" ref={paginationRef}>
        <Pagination
          totalCount={prevLoaderData?.count}
          perPageCount={10}
          currentPageParam={searchQuery.page}
          numOfVisibleButtons={7}
        />
      </div>
      <div className="search-results__content" ref={contentRef}>
        <SearchResultsContent categoryLoader={categoryLoader} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default SearchResults;
