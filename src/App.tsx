import { Component, createRef, MutableRefObject, PropsWithChildren } from 'react';
import ErrorComponent from './components/ui/error-component/error-component';
import SearchHeader from './components/ui/search-header/search-header';
import { selectOptions } from './constants/constants';
import { SwCategory } from './enums/enums';
import { loadSavedSearch } from './utils/load-saved-search';
import { CorrectResponseDataType, SavedSearchType } from './types/types';
import SearchResults from './components/ui/search-results/search-results';
import {
  CANCELED_REQUEST_MESSAGE,
  getIdleState,
  getLoadingState,
  loadData,
  LoaderState,
} from './utils/load-data';
import swService from './services/sw-service';

interface AppStateType {
  search: string;
  category: SwCategory;
  categoryLoader: LoaderState<CorrectResponseDataType>;
}

class App extends Component<PropsWithChildren, AppStateType> {
  constructor(props: PropsWithChildren) {
    super(props);

    const savedSearch = loadSavedSearch();

    this.state = {
      search: savedSearch?.search || '',
      category: savedSearch?.category || SwCategory.films,
      categoryLoader: getIdleState(),
    };
  }

  abortRef = createRef() as MutableRefObject<AbortController | undefined>;
  isMountedRef = createRef() as MutableRefObject<boolean>;

  handleSubmit = (searchState: SavedSearchType) => {
    this.setState(searchState);
    this.search(searchState);
  };

  search = async ({ search, category }: SavedSearchType) => {
    this.abortRef.current?.abort();
    const controller = new AbortController();
    this.abortRef.current = controller;

    this.setState((prevState) => ({ ...prevState, categoryLoader: getLoadingState() }));

    const nextLoaderState = await loadData(() =>
      swService.search({
        search,
        category,
        signal: controller.signal,
      })
    );

    if (!this.isMountedRef.current || nextLoaderState.error === CANCELED_REQUEST_MESSAGE) return;

    this.setState((prevState) => ({ ...prevState, categoryLoader: nextLoaderState }));
  };

  componentDidMount() {
    this.isMountedRef.current = true;
    const { search, category } = this.state;
    this.search({ search, category });
  }

  componentWillUnmount() {
    this.isMountedRef.current = false;
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
            <SearchResults {...categoryLoader} category={category} />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
