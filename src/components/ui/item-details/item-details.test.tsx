import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import ItemDetails from './item-details';
import { PUBLIC_PATH } from '../../../constants/constants';
import { assertAbsence, assertExistance, createGetter } from '../../../../tests/utils/test-utils';
import { addNetworkError } from '../../../../tests/msw/msw-utils';
import { server } from '../../../../tests/msw/server';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { renderWithRouter } from '../../../utils/test/render-with-router';
import { Route, Routes } from 'react-router';
import reducer from '../../../store/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '../../../store/api';

const renderItemDetails = ({ category = 'films', itemId = '1' }) => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });

  return {
    getState: store.getState,
    ...renderWithRouter(
      <Provider store={store}>
        <Routes>
          <Route path={`${PUBLIC_PATH}${category}/:itemId`} element={<ItemDetails />} />
          <Route path={`${PUBLIC_PATH}${category}/`} element={<div>Search page</div>} />
        </Routes>
      </Provider>,
      { route: `${PUBLIC_PATH}${category}/${itemId}` }
    ),
  };
};

const getWrap = createGetter('item-details');
const getLoader = createGetter('loader');
const getCloseBtn = () => screen.getByRole('button', { name: /close/i });
const getErrorMessage = () => screen.getByText(/Error occurred/i);
const getSearchPageText = () => screen.getByText(/Search page/i);

describe('ItemDetails', () => {
  describe('when item is loading', () => {
    test('should render component with close button, loader, change itemFetcher isLoading property', () => {
      const { getState } = renderItemDetails({});

      assertExistance(getWrap, getCloseBtn, getLoader);
      expect(getState().itemFetcher.isLoading).toBe(true);
    });
  });

  describe('when an error occurs while loading', () => {
    test('should render component with close button, error message, add error to itemFetcher', async () => {
      addNetworkError(server);
      const { getState } = renderItemDetails({});

      await waitForElementToBeRemoved(getLoader());

      assertExistance(getWrap, getCloseBtn, getErrorMessage);
      expect(getState().itemFetcher.isError).toBe(true);
      expect(getState().itemFetcher.error).not.toBe(null);
    });
  });

  describe('when loading is successful', () => {
    test.each([
      {
        category: 'films',
        component: 'Film',
        getter: () => screen.getByText(/The Phantom Menace/i),
      },
      {
        category: 'people',
        component: 'Man',
        getter: () => screen.getByText(/Leia Organa/i),
      },
      {
        category: 'planets',
        component: 'Planet',
        getter: () => screen.getByText(/Naboo/i),
      },
      {
        category: 'species',
        component: 'Species',
        getter: () => screen.getByText(/Droid/i),
      },
      {
        category: 'starships',
        component: 'Starship',
        getter: () => screen.getByText(/Millennium Falcon/i),
      },
      {
        category: 'vehicles',
        component: 'Vehicle',
        getter: () => screen.getByText(/TIE bomber/i),
      },
    ])(
      'should render $component component when category is $category, add data to itemFetcher',
      async ({ category, getter }) => {
        const { getState } = renderItemDetails({ category });

        await waitForElementToBeRemoved(getLoader());

        expect(getter()).toBeInTheDocument();
        expect(getState().itemFetcher.data).not.toBe(null);
      }
    );
  });

  describe('when detailed card is shown and button "Close" is clicked', () => {
    test('should hide detailed card', async () => {
      const user = userEvent.setup();

      renderItemDetails({});
      await user.click(getCloseBtn());

      expect(getSearchPageText()).toBeInTheDocument();
      assertAbsence(getWrap);
    });
  });
});
