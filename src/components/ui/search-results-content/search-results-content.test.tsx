import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResultsContent from './search-results-content';
import { CategoryLoaderAndSearchQueryType } from '../../../types/types';
import { getErrorState, getLoadingState, getSuccessState } from '../../../utils/load-data';
import { responses } from '../../../../tests/mocks/constants';
import { SwCategory } from '../../../enums/enums';
import { assertElements } from '../../../../tests/utils/test-utils';
import { MemoryRouter } from 'react-router';

const data = responses.emptySearch.category.films[0];
const emptyData = { count: 0, next: null, previous: null, results: [] };

const { search } = responses.emptySearch;
const category = SwCategory.films;

const searchQuery = {
  page: '1',
  search,
  category,
};

const renderSearchResultsContent = (props: CategoryLoaderAndSearchQueryType) =>
  render(<SearchResultsContent {...props} />, { wrapper: MemoryRouter });

const getLoader = () => screen.getByTestId('loader');
const getErrorMessage = () => screen.getByText(/Error/i);
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
  describe('when the status is loading', () => {
    test('should display a loader ', () => {
      renderSearchResultsContent({
        searchQuery,
        categoryLoader: getLoadingState(),
      });

      assertElements(renderingCases.loading);
    });
  });
  describe('when the status is error', () => {
    test('should display an error message', () => {
      renderSearchResultsContent({
        searchQuery,
        categoryLoader: getErrorState('Error'),
      });

      assertElements(renderingCases.error);
    });
  });
  describe('when the status is success, data.count and data.results values have truthy values', () => {
    test('should render ResultsList', () => {
      renderSearchResultsContent({
        searchQuery,
        categoryLoader: getSuccessState(data),
      });

      assertElements(renderingCases.loaded);
    });
  });

  describe('when the status is success, data.count or data.results has falsy value', () => {
    test('should render ResultsList', () => {
      renderSearchResultsContent({
        searchQuery,
        categoryLoader: getSuccessState(emptyData),
      });

      assertElements(renderingCases.notFound);
    });
  });
});
