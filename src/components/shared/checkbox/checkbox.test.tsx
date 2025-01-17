import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import Checkbox, { TCheckboxProps } from './checkbox';
import { assertAbsence, createArrayGetter } from '../../../../tests/utils/test-utils';

const renderCheckbox = ({ children, ...props }: TCheckboxProps) =>
  render(<Checkbox {...props}>{children}</Checkbox>);

const className = 'parent__checkbox';
const theme = 'main';
const size = 'lg';
const view = 'primary';
const text = 'test text';

const getControl = () => screen.getByRole('checkbox');
const getText = () => screen.getByText(text);
const getCheckbox = () => screen.getByTestId('checkbox');
const getTextWrap = createArrayGetter('checkbox__text');

describe('checkbox', () => {
  describe('when classMods, className are passed', () => {
    test('should render correctly with all classes', () => {
      const { asFragment } = renderCheckbox({
        className,
        classMods: { theme, view, size },
      });

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <label
            class="checkbox checkbox_theme_main checkbox_view_primary checkbox_size_lg parent__checkbox"
            data-testid="checkbox"
          >
            <input
              class="checkbox__control"
              type="checkbox"
            />
            <span
              class="checkbox__box"
            >
              <svg
                class="svg-icon svg-icon_view_check checkbox__check"
              >
                <use
                  xlink:href="#check"
                />
              </svg>
            </span>
          </label>
        </DocumentFragment>
      `);
    });
  });

  describe('when text is passed', () => {
    test('should render checkbox with text', () => {
      renderCheckbox({
        children: text,
      });

      expect(getText()).toBeInTheDocument();
    });
  });

  describe('when text is not passed', () => {
    test('should render checkbox without text and text container', () => {
      renderCheckbox({});

      assertAbsence(getText, getTextWrap);
    });
  });

  describe(`when controlProps.disabled = true, htmlFor = 'id' are passed`, () => {
    test('should pass props to inner components and render correctly', () => {
      renderCheckbox({
        controlProps: { disabled: true },
        children: text,
        htmlFor: 'id',
      });

      screen.logTestingPlaygroundURL();

      expect(getControl()).toBeDisabled();
      expect(getControl()).toHaveAttribute('id', 'id');
      expect(getCheckbox()).toHaveAttribute('for', 'id');
    });
  });
});
