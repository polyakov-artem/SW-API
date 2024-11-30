import { render, screen } from '@testing-library/react';
import Select, { SelectPropsType } from './select';
import { selectOptions } from '../../../constants/constants';
import userEvent from '@testing-library/user-event';
import { capitalizeWord } from '../../../utils/capitalize-word';

const selectTestId = 'select';

const renderSelect = ({ ...props }: SelectPropsType) => {
  const renderResult = render(
    <Select controlProps={{ onChange: () => {} }} data-testid={selectTestId} {...props} />
  );

  return {
    ...renderResult,
    user: userEvent.setup(),
  };
};

const getSelect = () => screen.getByTestId(selectTestId);
const getSelectControl = (): HTMLInputElement => screen.getByRole('combobox');

describe('Select', () => {
  describe('when className, classMods are passed', () => {
    test(`should render correctly with proper classes`, () => {
      const theme = 'main';
      const size = 'lg';
      const className = 'parent__select';
      const { asFragment } = renderSelect({
        className,
        classMods: { theme, size, invalid: true },
        options: [],
      });

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            class="select select_theme_main select_size_lg select_invalid parent__select"
            data-testid="select"
          >
            <select
              class="select__control"
            />
          </div>
        </DocumentFragment>
      `);
    });
  });

  describe('when disabled = true', () => {
    test(`should render disabled select`, () => {
      renderSelect({ controlProps: { disabled: true }, options: [] });

      expect(getSelectControl()).toBeDisabled();
    });
  });

  describe('when options are passed', () => {
    test(`should render all options`, async () => {
      const { user } = renderSelect({ controlProps: { disabled: true }, options: selectOptions });

      await user.click(getSelect());

      const options = screen.getAllByRole('option') as HTMLOptionElement[];
      expect(selectOptions.length).toBe(options.length);
      options.forEach((optionEl) => {
        expect(
          selectOptions.some(
            (option) => optionEl.textContent === option.label && optionEl.value === option.value
          )
        ).toBeTruthy;
      });
    });
  });

  describe('when options and value are passed', () => {
    test(`should render Select with label according to passed value`, () => {
      const selectedValue = selectOptions[2].value;
      const expectedLabel = capitalizeWord(selectOptions[2].label);

      renderSelect({
        controlProps: { value: selectedValue },
        options: selectOptions,
      });

      expect(screen.getByText(expectedLabel)).toBeInTheDocument();
    });
  });

  describe('when change option', () => {
    test(`should call onChange callback with new value`, async () => {
      const selectedValue = selectOptions[2].value;
      const nextValue = selectOptions[3].value;
      const onChange = vi.fn();

      const { user } = renderSelect({
        controlProps: { value: selectedValue, onChange },
        options: selectOptions,
      });

      await user.selectOptions(getSelectControl(), nextValue);

      expect(onChange).toBeCalled();
    });
  });
});
