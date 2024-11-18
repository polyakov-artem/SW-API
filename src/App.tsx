import { FC, useCallback, useEffect, useRef, useState } from 'react';
import ErrorComponent from './components/ui/error-component/error-component';
import SearchHeader from './components/ui/search-header/search-header';
import { selectOptions } from './constants/constants';
import { SwCategory } from './enums/enums';
import { loadSavedSearch } from './utils/load-saved-search';
import { CorrectResponseDataType, SavedSearchType } from './types/types';
import SearchResults from './components/ui/search-results/search-results';
import {
  CANCELED_REQUEST_MESSAGE,
  getLoadingState,
  loadData,
  LoaderState,
} from './utils/load-data';
import swService from './services/sw-service';

type CategoryLoaderStateType = LoaderState<CorrectResponseDataType>;

const getInitialSearchState = (): SavedSearchType => {
  const savedSearch = loadSavedSearch();

  return {
    search: savedSearch?.search || '',
    category: savedSearch?.category || SwCategory.films,
  };
};

const App: FC = () => {
  const [searchQuery, setSearchQuery] = useState<SavedSearchType>(getInitialSearchState);
  const [categoryLoader, setCategoryLoader] = useState<CategoryLoaderStateType>(getLoadingState);

  const abortRef = useRef(new AbortController());
  const isMountedRef = useRef(false);

  const handleSubmit = (searchState: SavedSearchType) => {
    setSearchQuery(searchState);
  };

  const searchItems = useCallback(async ({ search, category }: SavedSearchType) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setCategoryLoader(getLoadingState);

    const nextLoaderState = await loadData(() =>
      swService.search({
        search,
        category,
        signal: controller.signal,
      })
    );

    if (!isMountedRef.current || nextLoaderState.error === CANCELED_REQUEST_MESSAGE) return;

    setCategoryLoader(nextLoaderState);
  }, []);

  useEffect(() => {
    searchItems(searchQuery);
  }, [searchItems, searchQuery]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  const { search, category } = searchQuery;

  return (
    <div className="page">
      <header className="page__header">
        <div className="container">
          <ErrorComponent />
        </div>
      </header>
      <main className="page__main">
        <div className="page__search container">
          <SearchHeader
            options={selectOptions}
            initialCategory={category}
            initialSearch={search}
            onSubmit={handleSubmit}
          />
          <SearchResults {...categoryLoader} category={category} />
        </div>
      </main>
    </div>
  );
};

export default App;
