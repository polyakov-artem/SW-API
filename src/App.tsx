import { Component, PropsWithChildren } from 'react';
import ErrorComponent from './components/ui/error-component/error-component';
import SearchHeader from './components/ui/search-header/search-header';
import { selectOptions } from './constants/constants';
import { SwCategory } from './enums/enums';
import { loadSavedSearch } from './utils/load-saved-search';
import { SavedSearchType } from './types/types';

interface SearchStateType {
  search: string;
  category: SwCategory;
}

class App extends Component<PropsWithChildren, SearchStateType> {
  constructor(props: PropsWithChildren) {
    super(props);

    const savedSearch = loadSavedSearch();

    this.state = {
      search: savedSearch?.search || '',
      category: savedSearch?.category || SwCategory.films,
    };
  }

  handleSubmit = (searchState: SavedSearchType) => {
    this.setState(searchState);
  };

  render() {
    const { search, category } = this.state;

    return (
      <div className="page">
        <header className="page__header">
          <div className="container">
            <ErrorComponent />
          </div>
        </header>
        <main className="page__main">
          <div className="container">
            <SearchHeader
              options={selectOptions}
              initialCategory={category}
              initialSearch={search}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
