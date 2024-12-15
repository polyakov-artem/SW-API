import { describe, vi } from 'vitest';
import { Route, Routes } from 'react-router-dom';
import Search from './search';
import { renderWithRouter } from '../../../utils/test/render-with-router';
import ErrorBoundary from '../../shared/error-boundary/error-boundary';
import { BASE_URL, selectOptions } from '../../../constants/constants';
import { SwCategory } from '../../../enums/enums';
import PropsComponent, { PropsComponentProps } from '../../../../tests/components/props-component';
import { assertAbsence, assertExistance, createGetter } from '../../../../tests/utils/test-utils';
import { screen, waitFor } from '@testing-library/react';
import { getLoadingState } from '../../../utils/load-data';

const category = SwCategory.films;
const search = 'a';
const page = '1';
const itemId = '1';

const routeWithoutItemId = `${BASE_URL}${category}/?search=${search}&page=${page}`;
const routeWithInvalidPage = `${BASE_URL}${category}/?search=${search}&page=-1`;
const routeWithItemId = `${BASE_URL}${category}/${itemId}/?search=${search}&page=${page}`;
const searchHeaderTestId = 'search-header';
const searchResultsTestId = 'search-results';

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

const renderSearch = (route: string) => {
  return renderWithRouter(
    <>
      <Routes>
        <Route
          path={`${BASE_URL}:category/`}
          element={
            <ErrorBoundary>
              <Search />
            </ErrorBoundary>
          }>
          <Route path=":itemId" element={<div>Details component</div>} />
        </Route>
        <Route path={`${BASE_URL}not-found-page`} element={<div>not found page</div>} />
      </Routes>
    </>,
    {
      route,
    }
  );
};

const getSearch = createGetter('search');
const getSearchHeader = () => screen.getByTestId(searchHeaderTestId);
const getSearchResults = () => screen.getByTestId(searchResultsTestId);
const getOutletComponent = () => screen.getByText(/Details component/i);

describe('when the route is with item id', () => {
  test('should render correctly, pass all props to child components', () => {
    renderSearch(routeWithoutItemId);

    assertExistance(getSearch, getSearchHeader, getSearchResults);
    assertAbsence(getOutletComponent);
    expect(getSearch()).toHaveClass('search container');

    const expectedSearchHeaderProps = {
      className: 'search__search-header',
      options: selectOptions,
      initialCategory: category,
      initialSearch: search,
    };

    const expectedSearchResultsProps = {
      categoryLoader: getLoadingState(),
      searchQuery: { category, search, page },
    };

    expect(getSearchHeader()).toHaveTextContent(JSON.stringify(expectedSearchHeaderProps));
    expect(getSearchResults()).toHaveTextContent(JSON.stringify(expectedSearchResultsProps));
  });
});

describe('when the route is with item id', () => {
  test('should render component with correct classes, should render component inside Outlet', () => {
    renderSearch(routeWithItemId);

    assertExistance(getOutletComponent);
    expect(getSearch()).toHaveClass('search container search_has-details');
  });
});

describe('when categoryLoader.error === NOT_FOUND_MESSAGE', () => {
  test('should throw an error (caught in ErrorBoundary and redirected to page 404)', async () => {
    renderSearch(routeWithInvalidPage);

    await waitFor(() => expect(screen.getByText(/not found page/i)).toBeInTheDocument());
  });
});
