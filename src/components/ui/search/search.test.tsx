import { describe, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Search from './search';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '../../../store/api';
import reducer from '../../../store/reducer';
import { renderWithRouter } from '../../../utils/test/render-with-router';
import { PUBLIC_PATH, selectOptions } from '../../../constants/constants';
import PropsComponent, { PropsComponentProps } from '../../../../tests/components/props-component';
import { SwCategory } from '../../../enums/enums';
import { assertAbsence, assertExistance, createGetter } from '../../../../tests/utils/test-utils';
import { addNetworkError } from '../../../../tests/msw/msw-utils';
import { server } from '../../../../tests/msw/server';

const searchHeaderTestId = 'search-header';
const searchResultsTestId = 'search-results';
const outletComponentTestId = 'outlet-component';

const getSearchHeader = () => screen.getByTestId(searchHeaderTestId);
const getSearchResults = () => screen.getByTestId(searchResultsTestId);
const getOutletComponent = () => screen.getByTestId(outletComponentTestId);
const getSearch = createGetter('search');

vi.mock('../search-header/search-header', () => ({
  default: (props: PropsComponentProps) => (
    <PropsComponent testId={searchHeaderTestId} {...props} />
  ),
}));
vi.mock('../search-results/search-results', () => ({
  default: (props: PropsComponentProps) => (
    <PropsComponent testId={searchResultsTestId} {...props} />
  ),
}));

const renderSearch = (routeWithItemId: boolean = false) => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });

  const path = `${PUBLIC_PATH}${SwCategory.films}/`;
  const pathWithItemId = `${path}1`;

  return {
    store,
    ...renderWithRouter(
      <Provider store={store}>
        <Routes>
          <Route path={`${path}`} element={<Search />}>
            <Route
              path=":itemId"
              element={<div data-testid={outletComponentTestId}>Outlet component</div>}
            />
          </Route>
        </Routes>
      </Provider>,
      { route: routeWithItemId ? pathWithItemId : path }
    ),
  };
};

describe('Search', () => {
  describe('when the route is without itemId', () => {
    test(`should render inner components and pass correct props, should not render OutletComponent, not add class 'search_has-details'`, () => {
      renderSearch();

      assertExistance(getSearchHeader, getSearchResults);
      assertAbsence(getOutletComponent);

      const expectedSearchHeaderProps = {
        className: 'search__search-header',
        options: selectOptions,
        initialCategory: SwCategory.films,
        initialSearch: '',
      };

      expect(getSearchHeader()).toHaveTextContent(JSON.stringify(expectedSearchHeaderProps));
      expect(getSearch().classList).not.toContain('search_has-details');
    });
  });

  describe('when the route is with item id', () => {
    test('should render component inside Outlet and add class to Search component', () => {
      renderSearch(true);

      assertExistance(getOutletComponent);
      expect(getSearch().classList).toContain('search_has-details');
    });
  });

  describe('when the data download started', () => {
    test(`should dispatch 'itemsLoadingStarted' action`, () => {
      const { store } = renderSearch();

      const itemsLoaderState = store.getState().itemsLoader;
      expect(itemsLoaderState.isLoading).toBe(true);
    });
  });

  describe('the data download fails', () => {
    test(`should dispatch 'itemsLoadingFailed' action`, async () => {
      addNetworkError(server);

      const { store } = renderSearch();

      await waitFor(() => expect(store.getState().itemsLoader.isError).toBe(true));
      expect(store.getState().itemsLoader.error).not.toBe(null);
    });
  });

  describe('when the data download completes successfully', () => {
    test(`should dispatch 'itemsLoadingFinished' action`, async () => {
      const { store } = renderSearch();

      await waitFor(() => expect(store.getState().itemsLoader.data).not.toBe(null));
    });
  });
});
