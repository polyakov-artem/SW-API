import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';

import { assertAbsence, createGetter } from '../../../../tests/utils/test-utils';
import Switch, { TSwitchProps } from './switch';

const renderSwitch = ({ children, ...props }: TSwitchProps) =>
  render(<Switch {...props}>{children}</Switch>);

const className = 'parent__switch';
const theme = 'main';
const size = 'lg';
const view = 'primary';
const text = 'test text';

const getControl = () => screen.getByRole('checkbox');
const getText = () => screen.getByText(text);
const getSwitch = () => screen.getByTestId('switch');
const getTextWrap = createGetter('switch__text');

describe('Switch', () => {
  describe('when classMods, className are passed', () => {
    test('should render correctly with all classes', () => {
      const { asFragment } = renderSwitch({
        className,
        classMods: { theme, view, size },
      });

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <label
            class="switch switch_theme_main switch_view_primary switch_size_lg parent__switch"
            data-testid="switch"
          >
            <input
              class="switch__control"
              type="checkbox"
            />
            <span
              class="switch__box"
            />
          </label>
        </DocumentFragment>
      `);
    });
  });

  describe('when text is passed', () => {
    test('should render switch with text', () => {
      renderSwitch({
        children: text,
      });

      expect(getText()).toBeInTheDocument();
    });
  });

  describe('when text is not passed', () => {
    test('should render switch without text and text container', () => {
      renderSwitch({});

      assertAbsence(getText, getTextWrap);
    });
  });

  describe(`when controlProps.disabled = true, htmlFor = 'id' are passed`, () => {
    test('should pass props to inner components and render correctly', () => {
      renderSwitch({
        controlProps: { disabled: true },
        children: text,
        htmlFor: 'id',
      });

      expect(getControl()).toBeDisabled();
      expect(getControl()).toHaveAttribute('id', 'id');
      expect(getSwitch()).toHaveAttribute('for', 'id');
    });
  });
});
