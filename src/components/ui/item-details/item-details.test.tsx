import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import ItemDetails from './item-details';
import { BASE_URL } from '../../../constants/constants';
import ErrorBoundary from '../../shared/error-boundary/error-boundary';
import { assertAbsence, assertExistance, createGetter } from '../../../../tests/utils/test-utils';
import { addNetworkError } from '../../../../tests/msw/msw-utils';
import { server } from '../../../../tests/msw/server';
import userEvent from '@testing-library/user-event';

const renderItemDetails = ({
  category = 'films',
  itemId = '1',
}: {
  category?: string;
  itemId?: string;
}) =>
  render(
    <MemoryRouter initialEntries={[`${BASE_URL}${category}/${itemId}`]}>
      <Routes>
        <Route
          path={`${BASE_URL}:category/:itemId`}
          element={
            <ErrorBoundary>
              <ItemDetails />
            </ErrorBoundary>
          }
        />
        <Route path={`${BASE_URL}:category`} element={<div>Search page</div>} />
        <Route path={`${BASE_URL}not-found-page`} element={<div>Not found</div>} />
      </Routes>
    </MemoryRouter>
  );

const getWrap = createGetter('item-details');
const getLoader = createGetter('loader');
const getCloseBtn = () => screen.getByRole('button', { name: /close/i });
const getErrorMessage = () => screen.getByText(/Error occurred/i);
const getSearchTitle = () => screen.getByText(/Search page/i);

describe('ItemDetails', () => {
  describe('when item is not found', () => {
    test('should throw an error (redirects in ErrorBoundary to "not found" page)', async () => {
      renderItemDetails({ itemId: 's' });

      await waitFor(() => expect(screen.getByText(/not found/i)).toBeInTheDocument());
    });
  });

  describe('when item is loading', () => {
    test('should render wrap with className, close button, loader', () => {
      renderItemDetails({});

      assertExistance(getWrap, getCloseBtn, getLoader);
    });
  });

  describe('when an error occurs while loading', () => {
    test('should render wrap with className, close button, error message', async () => {
      addNetworkError(server);
      renderItemDetails({});

      await waitForElementToBeRemoved(getLoader());

      assertExistance(getWrap, getCloseBtn, getErrorMessage);
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
      'should render $component component when category is $category',
      async ({ category, getter }) => {
        renderItemDetails({ category });

        await waitForElementToBeRemoved(getLoader());

        expect(getter()).toBeInTheDocument();
      }
    );
  });

  describe('when detailed card is shown and button "Close" is clicked', () => {
    test('should hide detailed card', async () => {
      const user = userEvent.setup();

      renderItemDetails({});
      await user.click(getCloseBtn());

      expect(getSearchTitle()).toBeInTheDocument();
      assertAbsence(getWrap);
    });
  });
});
