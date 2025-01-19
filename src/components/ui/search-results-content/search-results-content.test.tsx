import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResultsContent from './search-results-content';
import { responses } from '../../../../tests/mocks/constants';
import { SwCategory } from '../../../enums/enums';
import { assertElements } from '../../../../tests/utils/test-utils';
import { renderWithRouter } from '../../../utils/test/render-with-router';
import { PUBLIC_PATH } from '../../../constants/constants';
import { initialState, TItemsLoaderState } from '../../../store/items-loader-slice';
import store from '../../../store/store';
import { Provider } from 'react-redux';

const defaultData = responses.emptySearch.category.films[0];
const defaultEmptyData = { count: 0, next: null, previous: null, results: [] };
const defaultSearch = '';
const defaultCategory: SwCategory = SwCategory.films;
const defaultItemsLoaderState: TItemsLoaderState = { ...initialState, isLoading: true };

const renderSearchResultsContent = ({
  itemsLoader = defaultItemsLoaderState,
  category = defaultCategory,
  search = defaultSearch,
}) => {
  return {
    ...renderWithRouter(
      <Provider store={store}>
        <SearchResultsContent itemsLoader={itemsLoader} />
      </Provider>,
      {
        route: `${PUBLIC_PATH}${category}/?search=${search}`,
      }
    ),
  };
};

const getLoader = () => screen.getByTestId('loader');
const getErrorMessage = () => screen.getByText(/Error occurred/i);
const getResultsList = () => screen.getByRole('list');
const getNoResultsMessage = () => screen.getByText(/No results/i);

const renderingCases = {
  loading: {
    exist: [getLoader],
    absent: [getErrorMessage, getResultsList, getNoResultsMessage],
  },
  error: {
    exist: [getErrorMessage],
    absent: [getLoader, getResultsList, getNoResultsMessage],
  },
  notFound: {
    exist: [getNoResultsMessage],
    absent: [getLoader, getResultsList, getErrorMessage],
  },
  loaded: {
    exist: [getResultsList],
    absent: [getLoader, getNoResultsMessage, getErrorMessage],
  },
};

describe('SearchResultsContent', () => {
  describe('when data is loading', () => {
    test('should display a loader ', () => {
      renderSearchResultsContent({});

      assertElements(renderingCases.loading);
    });
  });
  describe('when an error occurs during loading', () => {
    test('should display an error message', () => {
      const message = 'Unexpected error';

      renderSearchResultsContent({
        itemsLoader: { ...initialState, isError: true, error: message },
      });

      assertElements(renderingCases.error);
    });
  });
  describe('when the download completes successfully, data.results.length > 0', () => {
    test('should render ResultsList', () => {
      renderSearchResultsContent({
        itemsLoader: { ...initialState, data: defaultData },
      });

      assertElements(renderingCases.loaded);
    });
  });

  describe('when the download completes successfully, data.results.length === 0', () => {
    test('should render ResultsList', () => {
      renderSearchResultsContent({
        itemsLoader: { ...initialState, data: defaultEmptyData },
      });

      assertElements(renderingCases.notFound);
    });
  });
});
