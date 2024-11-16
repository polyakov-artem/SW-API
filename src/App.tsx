import { FC } from 'react';
import ErrorComponent from './components/ui/error-component/error-component';
import SearchHeader from './components/ui/search-header/search-header';
import { selectOptions } from './constants/constants';

const App: FC = () => {
  return (
    <div className="page">
      <header className="page__header">
        <div className="container">
          <ErrorComponent />
        </div>
      </header>
      <main className="page__main">
        <div className="container">
          <SearchHeader options={selectOptions} />
        </div>
      </main>
    </div>
  );
};

export default App;
