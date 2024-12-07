import { FC, useEffect, useState } from 'react';
import ErrorComponent from './components/ui/error-component/error-component';

import { useNavigate } from 'react-router';
import useParamsForItemsSearch from './hooks/use-params-for-items-search';
import Search from './components/ui/search/search';
import { useSavedSearch } from './hooks/use-saved-search';
import { BASE_URL } from './constants/constants';

const App: FC = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const paramsForItemsSearch = useParamsForItemsSearch();
  const savedSearch = useSavedSearch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isFirstLoading) {
      const { search, category, page } = savedSearch || paramsForItemsSearch;
      navigate(`${BASE_URL}${category}/?search=${search}&page=${page}`);

      setIsFirstLoading(false);
    }
  }, [navigate, paramsForItemsSearch, isFirstLoading, savedSearch]);

  if (isFirstLoading) {
    return null;
  }

  return (
    <div className="page">
      <header className="page__header">
        <div className="container">
          <ErrorComponent />
        </div>
      </header>
      <main className="page__main">
        <Search />
      </main>
    </div>
  );
};

export default App;
