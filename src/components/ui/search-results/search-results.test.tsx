import { getAllByRole, getByRole, screen } from '@testing-library/react';
import { assertAbsence, assertExistance, createGetter } from '../../../../tests/utils/test-utils';
import SearchResults from './search-results';
import { SwCategory } from '../../../enums/enums';
import { responses } from '../../../../tests/mocks/constants';
import { PUBLIC_PATH } from '../../../constants/constants';
import { renderWithRouter } from '../../../utils/test/render-with-router';
import itemsLoaderReducer, {
  initialState as initialItemsLoaderState,
  itemsLoadingFinished,
} from '../../../store/items-loader-slice';
import downloadLoaderReducer from '../../../store/download-items-slice';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { act } from 'react';
import { Route, Routes } from 'react-router';

const getSearchResults = createGetter('search-results');
const getPaginationWrap = createGetter('search-results__pagination-wrap');
const getContentWrap = createGetter('search-results__content');
const getPagination = () => getByRole(getPaginationWrap(), 'list');
const getResultsList = () => getByRole(getContentWrap(), 'list');
const getContentLoader = () => screen.getByTestId('loader');
const getCurrentLocation = () => window.location.toString();

const endpointsResponses = {
  [SwCategory.people]: responses.emptySearch.category.people[0],
  [SwCategory.films]: responses.emptySearch.category.films[0],
};

const renderSearchResults = (category: SwCategory, itemsLoaderState = initialItemsLoaderState) => {
  const store = configureStore({
    preloadedState: { itemsLoader: itemsLoaderState },
    reducer: combineReducers({
      itemsLoader: itemsLoaderReducer,
      downloadItems: downloadLoaderReducer,
    }),
  });

  return {
    getState: store.getState,
    dispatch: store.dispatch,
    ...renderWithRouter(
      <Provider store={store}>
        <Routes>
          <Route path={`${PUBLIC_PATH}${category}/:itemId?`} element={<SearchResults />} />
        </Routes>
      </Provider>,
      {
        route: `${PUBLIC_PATH}${category}/1/?search=a&page=1`,
      }
    ),
  };
};

describe('SearchResults', () => {
  describe('when no data or data are loading', () => {
    test('should render correctly', () => {
      renderSearchResults(SwCategory.films, { ...initialItemsLoaderState, isLoading: true });

      assertExistance(getSearchResults, getPaginationWrap, getContentWrap, getContentLoader);
      assertAbsence(getPagination);
    });
  });

  describe('when data are loaded', () => {
    test('should render pagination with correct buttons, correctly render results list', async () => {
      const category = SwCategory.people;
      const data = endpointsResponses[category];

      renderSearchResults(category, {
        ...initialItemsLoaderState,
        data,
      });

      const paginationItems = getAllByRole(getPagination(), 'listitem');
      expect(paginationItems.map((link) => link.textContent)).toEqual([
        '«',
        '1',
        '2',
        '3',
        '4',
        '5',
        '...',
        '9',
        '»',
      ]);

      const resultsListItems = getAllByRole(getResultsList(), 'listitem');
      const names = data.results.map((result) => result.name);
      resultsListItems.forEach((listItem) =>
        expect(names.some((name) => listItem.textContent === name)).toBe(true)
      );
    });
  });

  describe('when data are changed', () => {
    test('should update pagination', async () => {
      const category = SwCategory.people;
      const data = endpointsResponses[category];
      const { dispatch } = renderSearchResults(category, {
        ...initialItemsLoaderState,
        data,
      });
      const paginationItems = getAllByRole(getPagination(), 'listitem');
      expect(paginationItems.length).toBe(9);

      act(() => {
        dispatch(itemsLoadingFinished(endpointsResponses[SwCategory.films]));
      });

      assertAbsence(getPagination);
    });
  });

  describe('when clicking outside pagination and content areas', () => {
    test('should navigate to the correct URL', async () => {
      const category = SwCategory.people;
      const { user } = renderSearchResults(category);

      await user.click(getSearchResults());

      const { search } = window.location;
      const expectedRoute = `http://localhost:3000${PUBLIC_PATH}${category}/${search}`;
      expect(getCurrentLocation()).toBe(expectedRoute);
    });
  });

  describe('when clicking inside pagination wrap or content wrap', () => {
    test('should not navigate', async () => {
      const category = SwCategory.people;
      const { user } = renderSearchResults(category);
      const savedURL = getCurrentLocation();

      await user.click(getPaginationWrap());
      expect(getCurrentLocation()).toBe(savedURL);

      await user.click(getContentWrap());
      expect(getCurrentLocation()).toBe(savedURL);
    });
  });
});
