import { Component, PropsWithChildren } from 'react';
import ErrorComponent from './components/ui/error-component/error-component';
import SearchHeader from './components/ui/search-header/search-header';
import { selectOptions } from './constants/constants';
import { SwCategory } from './enums/enums';
import { loadSavedSearch } from './utils/load-saved-search';
import { CorrectResponseDataType, SavedSearchType } from './types/types';
import SearchResults from './components/ui/search-results/search-results';
import { getIdleState, getLoadingState, loadData, LoaderState } from './utils/load-data';
import swService from './services/sw-service';

interface SearchStateType {
  search: string;
  category: SwCategory;
  categoryLoader: LoaderState<CorrectResponseDataType>;
}

class App extends Component<PropsWithChildren, SearchStateType> {
  constructor(props: PropsWithChildren) {
    super(props);

    const savedSearch = loadSavedSearch();

    this.state = {
      search: savedSearch?.search || '',
      category: savedSearch?.category || SwCategory.films,
      categoryLoader: getIdleState(),
    };
  }

  handleSubmit = (searchState: SavedSearchType) => {
    this.setState(searchState);
    this.search();
  };

  search = async () => {
    const { search, category } = this.state;
    this.setState((prevState) => ({ ...prevState, categoryLoader: getLoadingState() }));
    const nextLoaderState = await loadData(() => swService.search({ category, search }));
    this.setState((prevState) => ({ ...prevState, categoryLoader: nextLoaderState }));
  };

  componentDidMount(): void {
    this.search();
  }

  render() {
    const { search, category, categoryLoader } = this.state;

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
              onSubmit={this.handleSubmit}
            />
            <SearchResults {...categoryLoader} />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
