import { getAllByRole, getByRole, screen } from '@testing-library/react';
import { assertAbsence, assertExistance, createGetter } from '../../../../tests/utils/test-utils';
import { CategoryLoaderAndSearchQueryType } from '../../../types/types';
import SearchResults from './search-results';
import { SwCategory } from '../../../enums/enums';
import { responses } from '../../../../tests/mocks/constants';
import { getLoadingState, getSuccessState } from '../../../utils/load-data';
import { BASE_URL } from '../../../constants/constants';
import { renderWithRouter } from '../../../utils/test/render-with-router';
import { Route, Routes } from 'react-router';

const getSearchResults = createGetter('search-results');
const getPaginationWrap = createGetter('search-results__pagination-wrap');
const getContentWrap = createGetter('search-results__content');
const getPagination = () => getByRole(getPaginationWrap(), 'list');
const getResultsList = () => getByRole(getContentWrap(), 'list');
const getContentLoader = () => screen.getByTestId('loader');
const getCurrentLocation = () => window.location.toString();

const firstProps = {
  searchQuery: {
    category: SwCategory.people,
    search: 'a',
    page: '1',
  },
  categoryLoader: getSuccessState(responses.notEmptySearch.category.people[0]),
};

const secondProps = {
  searchQuery: {
    category: SwCategory.films,
    search: 'a',
    page: '1',
  },
  categoryLoader: getSuccessState(responses.notEmptySearch.category.films[1]),
};

const renderSearchResults = (props: CategoryLoaderAndSearchQueryType = firstProps) => {
  const { category, search, page } = props.searchQuery;

  return renderWithRouter(
    <>
      <Routes>
        <Route path={`${BASE_URL}:category/:itemId?`} element={<SearchResults {...props} />} />
      </Routes>
    </>,
    {
      route: `${BASE_URL}${category}/1/?search=${search}&page=${page}`,
    }
  );
};

describe('SearchResults', () => {
  describe('when data are loading', () => {
    test('should render correctly', () => {
      renderSearchResults({ ...firstProps, categoryLoader: getLoadingState() });

      assertExistance(getSearchResults, getPaginationWrap, getContentWrap, getContentLoader);
      assertAbsence(getPagination);
    });
  });

  describe('when data are loaded', () => {
    test('should render pagination with correct buttons, correctly render results list', () => {
      const props = firstProps;
      const { data } = props.categoryLoader;
      renderSearchResults(props);

      const paginationItems = getAllByRole(getPagination(), 'listitem');
      expect(paginationItems.map((link) => link.textContent)).toEqual([
        '«',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '»',
      ]);

      const resultsListItems = getAllByRole(getResultsList(), 'listitem');
      const titles = data.results.map((result) => result.name);
      resultsListItems.forEach((listItem) =>
        expect(titles.some((title) => listItem.textContent === title)).toBe(true)
      );
    });
  });

  describe('when data are changed', () => {
    test('should update pagination', async () => {
      const { rerender } = renderSearchResults();

      const paginationItems = getAllByRole(getPagination(), 'listitem');
      expect(paginationItems.length).toBe(8);

      const newProps = secondProps;
      const { category, search, page } = newProps.searchQuery;
      const route = `${BASE_URL}${category}/1/?search=${search}&page=${page}`;

      rerender(<SearchResults {...secondProps} />, { route });
      assertAbsence(getPagination);
    });
  });

  describe('when clicking outside pagination and content areas', () => {
    test('should navigate to the correct URL', async () => {
      const { user } = renderSearchResults();
      await user.click(getSearchResults());

      const { search } = window.location;
      const { category } = firstProps.searchQuery;
      const expectedRoute = `http://localhost:3000${BASE_URL}${category}/${search}`;
      expect(getCurrentLocation()).toBe(expectedRoute);
    });
  });

  describe('when clicking inside pagination wrap or content wrap', () => {
    test('should not navigate', async () => {
      const { user } = renderSearchResults();
      const savedURL = getCurrentLocation();

      await user.click(getPaginationWrap());
      expect(getCurrentLocation()).toBe(savedURL);

      await user.click(getContentWrap());
      expect(getCurrentLocation()).toBe(savedURL);
    });
  });
});
