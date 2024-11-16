import { FC } from 'react';
import ErrorComponent from './components/ui/error-component/error-component';

const App: FC = () => {
  return (
    <div className="page">
      <header className="page__header">
        <div className="container">
          <ErrorComponent />
        </div>
      </header>
      <main className="page__main">
        <div className="container"></div>
      </main>
    </div>
  );
};

export default App;
