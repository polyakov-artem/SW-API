import { render, screen } from '@testing-library/react';
import ResultsItem, { BASE_CLASS_NAME, itemLink, ResultsItemProps } from './results-item';
import { SwCategory } from '../../../enums/enums';
import { ItemsSearchQueryType } from '../../../types/types';
import { MemoryRouter } from 'react-router';
import { BASE_URL } from '../../../constants/constants';

const category = SwCategory.films;
const search = '';
const page = '1';
const id = 4;

const searchQuery: ItemsSearchQueryType = { category, search, page };

const props: ResultsItemProps = {
  title: 'The Phantom Menace',
  url: `https://swapi.dev/api/films/${id}/`,
  searchQuery,
};

const renderResultsItem = () => render(<ResultsItem {...props} />, { wrapper: MemoryRouter });

const getListItem = () => screen.getByRole('listitem');
const getLink = () => screen.getByRole('link');

describe('ResultsItem', () => {
  describe('when props are passed', () => {
    test('should render properly with correct href link attribute', () => {
      renderResultsItem();

      expect(getListItem()).toHaveClass(BASE_CLASS_NAME);
      expect(getLink()).toHaveClass(itemLink);
      expect(getLink()).toHaveAttribute(
        'href',
        `${BASE_URL}${category}/${id}/?search=${search}&page=${page}`
      );
    });
  });
});
