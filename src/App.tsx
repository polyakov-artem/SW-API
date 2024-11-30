import { FC, useState } from 'react';
import ErrorComponent from './components/ui/error-component/error-component';
import { loadSavedSearch } from './utils/load-saved-search';
import { ItemsSearchQueryType } from './types/types';
import { Navigate } from 'react-router';
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

  if (isFirstLoading) {
    const { search, category, page } = getInitialSearchState(paramsForItemsSearch);
    setIsFirstLoading(false);
    return <Navigate to={`/${category}/?search=${search}&page=${page}`} />;
  }

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
