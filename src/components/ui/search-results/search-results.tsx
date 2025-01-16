import { FC, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import './search-results.scss';
import Pagination from '../../shared/pagination/pagination';
import { useLocation, useNavigate, useParams } from 'react-router';
import { PUBLIC_PATH } from '../../../constants/constants';
import { getFirstPathNamePart } from '../../../utils/get-first-pathname-part';
import { selectItemsLoader } from '../../../store/items-loader-slice';
import { useAppSelector } from '../../../hooks/store-hooks';
import SearchResultsContent from '../search-results-content/search-results-content';

const SearchResults: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { itemId } = useParams();
  const category = getFirstPathNamePart();
  const itemsLoader = useAppSelector(selectItemsLoader);
  const itemsTotalCount = itemsLoader.data?.count;
  const [savedTotalCount, setSavedTotalCount] = useState(itemsLoader.data?.count || 0);

  const paginationRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemsTotalCount !== undefined && itemsTotalCount !== savedTotalCount) {
      setSavedTotalCount(itemsTotalCount);
    }
  }, [itemsTotalCount, savedTotalCount]);

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

      navigate(`${PUBLIC_PATH}${category}/${location.search}`, { relative: 'path' });
    },
    [navigate, category, location.search, itemId]
  );

  return (
    <div className="search-results" onClick={handleClick}>
      <div className="search-results__pagination-wrap" ref={paginationRef}>
        {!!savedTotalCount && <Pagination totalCount={savedTotalCount} perPageCount={10} />}
      </div>
      <div className="search-results__content" ref={contentRef}>
        <SearchResultsContent itemsLoader={itemsLoader} />
      </div>
    </div>
  );
};

export default SearchResults;
