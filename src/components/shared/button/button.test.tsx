import { render, screen } from '@testing-library/react';
import Button, { ButtonPropsType } from './button';

const iconId = 'icon';
const icon = <span data-testid={iconId}>♫</span>;
const text = 'Click me';

const renderButton = ({ children, ...props }: ButtonPropsType) =>
  render(<Button {...props}>{children}</Button>);

const getButton = () => screen.getByRole('button');
const getIcon = () => screen.getByTestId(iconId);
const getText = () => screen.getByText(text);

describe('Button', () => {
  describe('when classMods, className are passed', () => {
    test(`should render correctly with all classes`, () => {
      const className = 'parent__button';
      const theme = 'main';
      const size = 'lg';
      const view = 'primary';

      const { asFragment } = renderButton({
        className,
        classMods: { theme, view, size, ['icon-before']: true },
      });

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <button
            class="btn btn_theme_main btn_view_primary btn_size_lg btn_icon-before parent__button"
          >
            <span
              class="btn__inner"
            >
              <span
                class="btn__text"
              />
            </span>
          </button>
        </DocumentFragment>
      `);
    });
  });

  describe('when disabled = true', () => {
    test(`should render disabled button`, () => {
      renderButton({ disabled: true });

      expect(getButton()).toBeDisabled();
    });
  });

  describe('when text, icon are passed', () => {
    test(`should render text with icon`, () => {
      renderButton({ children: text, icon });

      expect(getText()).toBeInTheDocument();
      expect(getIcon()).toBeInTheDocument();
    });
  });
});
