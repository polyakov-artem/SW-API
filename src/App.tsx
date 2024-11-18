import { FC, useEffect, useState } from 'react';
import ErrorComponent from './components/ui/error-component/error-component';
import { loadSavedSearch } from './utils/load-saved-search';
import { ItemsSearchQueryType } from './types/types';
import { useNavigate } from 'react-router';
import useParamsForItemsSearch from './hooks/use-params-for-items-search';
import Search from './components/ui/search/search';

const getInitialSearchState = (
  paramsForItemsSearch: ItemsSearchQueryType
): ItemsSearchQueryType => {
  const { category, search } = loadSavedSearch();

  if (category) {
    return {
      category,
      search: search || '',
      page: '1',
    };
  }

  return paramsForItemsSearch;
};

const App: FC = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const paramsForItemsSearch = useParamsForItemsSearch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isFirstLoading) {
      const { search, category, page } = getInitialSearchState(paramsForItemsSearch);
      navigate(`/${category}/?search=${search}&page=${page}`);

      setIsFirstLoading(false);
    }
  }, [navigate, paramsForItemsSearch, isFirstLoading]);

  return (
    <div className="page">
      <header className="page__header">
        <div className="container">
          <ErrorComponent />
        </div>
      </header>
      <main className="page__main">
        <div className="page__search container">{isFirstLoading ? null : <Search />}</div>
      </main>
    </div>
  );
};

export default App;
