import { render, screen } from '@testing-library/react';
import SearchHeader, { SearchHeaderPropsType } from './search-header';
import { SwCategory } from '../../../enums/enums';
import { BrowserRouter } from 'react-router-dom';
import { assertExistance, createGetter } from '../../../../tests/utils/test-utils';
import userEvent from '@testing-library/user-event';
import swService from '../../../services/sw-service';
import { BASE_URL } from '../../../constants/constants';

const options = [
  { value: SwCategory.people, label: 'People' },
  { value: SwCategory.planets, label: 'Planets' },
];

const initialCategory = options[0].value;
const initialSearch = '';
const className = 'header__search';

const defaultProps = {
  options,
  initialCategory,
  initialSearch,
  onSubmit: vi.fn(),
  className,
};

const renderSearchHeader = (props: SearchHeaderPropsType = defaultProps) => {
  return {
    ...render(<SearchHeader {...props} />, { wrapper: BrowserRouter }),
    user: userEvent.setup(),
  };
};

const getCurrentLocation = () => window.location.toString();

const getHeader = createGetter('search-header');
const getHeading = () => screen.getByRole('heading', { name: /Enter your search request/i });
const getForm = createGetter('search-header__field');
const getSelect = () => screen.getByRole('combobox');
const getInput = () => screen.getByRole('textbox');
const getButton = () => screen.getByRole('button', { name: /Search/i });

describe('SearchHeader', () => {
  describe('when all props are provided', () => {
    test('should render correctly with proper class names', () => {
      renderSearchHeader();
      assertExistance(getHeader, getHeading, getForm, getSelect, getInput, getButton);
      expect(getHeader()).toHaveClass(className);
      expect(getSelect()).toHaveValue(initialCategory);
      expect(getInput()).toHaveValue(initialSearch);
    });
  });

  describe('when category is changed, user typed search text', () => {
    test('should update correctly', async () => {
      const expectedCategory = options[1].label;
      const expectedSearch = 'search text';

      const { user } = renderSearchHeader();
      await user.selectOptions(getSelect(), options[1].value);
      await user.type(getInput(), expectedSearch);

      expect(
        screen.getByRole<HTMLOptionElement>('option', { name: expectedCategory }).selected
      ).toBe(true);
      expect(getInput()).toHaveValue(expectedSearch);
    });
  });

  describe('when initialCategory is not provided', () => {
    test(`should use the first option's value as category`, () => {
      renderSearchHeader({ ...defaultProps, initialCategory: undefined as unknown as SwCategory });

      expect(getSelect()).toHaveValue(initialCategory);
    });
  });

  describe('when initialCategory is not found in options', () => {
    test(`should use the first option's value as category`, () => {
      renderSearchHeader({ ...defaultProps, initialCategory: 'someCategory' as SwCategory });

      expect(getSelect()).toHaveValue(initialCategory);
    });
  });

  describe('when initialSearch is not provided', () => {
    test(`should input with value equal to ''`, () => {
      renderSearchHeader({ ...defaultProps, initialSearch: undefined as unknown as string });

      expect(getInput()).toHaveValue(initialSearch);
    });
  });

  describe('when category is changed', () => {
    test(`should clear search input`, async () => {
      const initialSearch = 'Luke';
      const { user } = renderSearchHeader({ ...defaultProps, initialSearch });
      expect(getInput()).toHaveValue(initialSearch);

      await user.selectOptions(getSelect(), options[1].value);

      expect(getInput()).toHaveValue('');
    });
  });

  describe('when submit button is clicked', async () => {
    test(`should trim whitespace from search input, save search state, navigate to the correct URL`, async () => {
      const initialSearch = '   Luke  ';
      const onSubmit = vi.fn();
      const trimmedSearch = initialSearch.trim();
      const mockSaveSearch = vi.spyOn(swService, 'saveSearch').mockImplementation(vi.fn());

      const { user } = renderSearchHeader({ ...defaultProps, initialSearch, onSubmit });
      expect(getInput()).toHaveValue(initialSearch);
      await user.click(getButton());

      expect(getInput()).toHaveValue(trimmedSearch);

      expect(mockSaveSearch).toHaveBeenCalledWith({
        search: trimmedSearch,
        category: defaultProps.initialCategory,
      });

      expect(getCurrentLocation()).toBe(
        `http://localhost:3000${BASE_URL}${defaultProps.initialCategory}/?search=${trimmedSearch}&page=1`
      );

      expect(onSubmit).toBeCalled();
    });
  });
});
