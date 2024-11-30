import { render, screen } from '@testing-library/react';
import Input, { InputPropsType } from './input';

const iconId = 'icon';
const icon = <span data-testid={iconId}>♫</span>;
const inputTestId = 'input';

const renderInput = ({ ...props }: InputPropsType) =>
  render(<Input {...props} data-testid={inputTestId} />);

const getInput = () => screen.getByTestId(inputTestId);
const getInputControl = (): HTMLInputElement => screen.getByRole('textbox');
const getIcon = () => screen.getByTestId(iconId);

describe('Input', () => {
  describe('when className, classMods are passed', () => {
    test(`should render correctly with proper classes`, () => {
      const theme = 'main';
      const size = 'lg';
      const className = 'parent__input';
      const { asFragment } = renderInput({
        className,
        classMods: { theme, size, invalid: true },
      });

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="input input_theme_main input_size_lg input_invalid parent__input"
            data-testid="input"
          >
            <input
              class="input__control"
            />
          </div>
        </DocumentFragment>
      `);
    });
  });

  describe('when disabled = true', () => {
    test(`should render disabled input`, () => {
      renderInput({ controlProps: { disabled: true } });

      expect(getInputControl()).toBeDisabled();
    });
  });

  describe('when value is passed', () => {
    test(`should render input with value`, () => {
      renderInput({ controlProps: { value: 'text', onChange: () => {} } });

      expect(getInputControl().value).toBe('text');
    });
  });

  describe('when icon is passed', () => {
    test(`should render input with icon with proper classes`, () => {
      renderInput({ icon, classMods: { 'icon-after': true } });

      expect(getIcon()).toBeInTheDocument();
      expect(getInput().classList.contains('input_icon-after')).toBeTruthy();
    });
  });
});
