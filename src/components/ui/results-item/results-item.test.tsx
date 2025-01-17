import { render, screen } from '@testing-library/react';
import ResultsItem, { BASE_CLASS_NAME, itemLink, ResultsItemProps } from './results-item';
import { SwCategory } from '../../../enums/enums';
import { TFilm, TItemsQuery } from '../../../types/types';
import { MemoryRouter } from 'react-router';
import { PUBLIC_PATH } from '../../../constants/constants';
import userEvent from '@testing-library/user-event';

const id = 4;
const title = 'The Phantom Menace';
const category = SwCategory.films;
const search = '';
const page = '1';
const searchQuery: TItemsQuery = { category, search, page };
const onChange = vi.fn();

const defaultProps: ResultsItemProps = {
  title,
  item: { url: `https://swapi.dev/api/films/${id}/`, title } as TFilm,
  searchQuery,
  checkboxIsChecked: false,
  onChange,
};

const renderResultsItem = (props = defaultProps) => ({
  ...render(<ResultsItem {...props} />, { wrapper: MemoryRouter }),
  user: userEvent.setup(),
});

const getListItem = () => screen.getByRole('listitem');
const getLink = () => screen.getByRole('link');
const getCheckbox = () => screen.getByRole('checkbox');

describe('ResultsItem', () => {
  describe('when default props are passed', () => {
    test('should render correctly', () => {
      renderResultsItem();

      expect(getListItem()).toHaveClass(BASE_CLASS_NAME);
      expect(getLink()).toHaveClass(itemLink);
      expect(getCheckbox()).not.toBeChecked();
      expect(getLink()).toHaveAttribute(
        'href',
        `${PUBLIC_PATH}${category}/${id}/?search=${search}&page=${page}`
      );
    });
  });

  describe('when checkboxIsChecked property is true', () => {
    test('should render component with checked checkbox', () => {
      renderResultsItem({ ...defaultProps, checkboxIsChecked: true });

      expect(getCheckbox()).toBeChecked();
    });
  });

  describe('when clicking on checkbox', () => {
    test('onChange callback function should be called with proper arguments', async () => {
      const { user } = renderResultsItem();

      await user.click(getCheckbox());

      expect(onChange).toBeCalledWith(defaultProps.item);
    });
  });
});
