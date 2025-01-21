import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import mockLocalStorageService from '../../../services/local-storage-service';
import ThemeSwitcher, {
  testId,
  BASE_CLASS_NAME,
  onBtn,
  offBtn,
  ATTRIBUTE_KEY,
  DARK_THEME,
  LIGHT_THEME,
} from './theme-switcher';
import { ComponentProps } from 'react';
import userEvent from '@testing-library/user-event';

vi.mock('../../../services/local-storage-service', () => ({
  default: {
    getData: vi.fn(),
    saveData: vi.fn(),
  },
}));

const renderThemeSwitcher = (props: ComponentProps<'div'>) => {
  return {
    user: userEvent.setup(),
    ...render(<ThemeSwitcher {...props} />),
  };
};

const getThemeSwitcher = () => screen.getByTestId(testId);
const getCheckbox = () => screen.getByRole('checkbox');
const getOnBtn = () => screen.getByText('🌙');
const getOffBtn = () => screen.getByText('🌞');

describe('ThemeSwitcher', () => {
  describe('when first rendered, className is passed, no saved theme in localStorage', () => {
    test('should render correctly, add className to component, check if there is saved theme in localStorage, add default theme to html, save default theme to localStorage', () => {
      const className = 'parent__theme-switcher';

      renderThemeSwitcher({ className });

      expect(getThemeSwitcher()).toHaveClass(`${BASE_CLASS_NAME} ${className}`);
      expect(getOnBtn()).toHaveClass(onBtn);
      expect(getOffBtn()).toHaveClass(offBtn);
      expect(getCheckbox()).not.toBeChecked();
      expect(mockLocalStorageService.getData).toHaveBeenCalledWith(ATTRIBUTE_KEY);
      expect(mockLocalStorageService.saveData).toHaveBeenCalledWith(ATTRIBUTE_KEY, LIGHT_THEME);
      expect(document.documentElement).toHaveAttribute(ATTRIBUTE_KEY, LIGHT_THEME);
    });
  });

  describe(`when there is saved "${DARK_THEME}" theme in localStorage`, () => {
    test('should load saved theme, add theme to html, check the checkbox', () => {
      vi.mocked(mockLocalStorageService.getData).mockReturnValue(DARK_THEME);

      renderThemeSwitcher({});

      expect(getCheckbox()).toBeChecked();
      expect(mockLocalStorageService.getData).toHaveBeenCalledWith(ATTRIBUTE_KEY);
      expect(mockLocalStorageService.saveData).toHaveBeenCalledWith(ATTRIBUTE_KEY, DARK_THEME);
      expect(document.documentElement).toHaveAttribute(ATTRIBUTE_KEY, DARK_THEME);
    });
  });

  describe(`when the switch is on and then off`, () => {
    test('should save theme value to localStorage each time, toggle the checkbox', async () => {
      const { user } = renderThemeSwitcher({});

      await user.click(getCheckbox());

      expect(getCheckbox()).toBeChecked();
      expect(mockLocalStorageService.saveData).toHaveBeenCalledWith(ATTRIBUTE_KEY, DARK_THEME);
      expect(document.documentElement).toHaveAttribute(ATTRIBUTE_KEY, DARK_THEME);

      await user.click(getCheckbox());

      expect(getCheckbox()).not.toBeChecked();
      expect(mockLocalStorageService.saveData).toHaveBeenCalledWith(ATTRIBUTE_KEY, LIGHT_THEME);
      expect(document.documentElement).toHaveAttribute(ATTRIBUTE_KEY, LIGHT_THEME);
    });
  });
});
