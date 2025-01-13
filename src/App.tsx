import { FC, useEffect, useState } from 'react';
import ErrorComponent from './components/ui/error-component/error-component';
import { Navigate } from 'react-router';
import Search from './components/ui/search/search';
import { useSavedSearch } from './hooks/use-saved-search';
import { PUBLIC_PATH } from './constants/constants';
import useParamsForItemsSearch from './hooks/use-params-for-items-search';
import { SwCategory } from './enums/enums';

const App: FC = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const paramsForItemsSearch = useParamsForItemsSearch();
  const savedSearch = useSavedSearch();

  const { search, category, page } = savedSearch || paramsForItemsSearch;

  useEffect(() => {
    setIsFirstLoading(false);
  }, []);

  return isFirstLoading ? (
    <Navigate to={`${PUBLIC_PATH}${category || SwCategory.films}/?search=${search}&page=${page}`} />
  ) : (
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
