import { ComponentProps, FC } from 'react';
import { Size } from '../../../types/types';

import './select.scss';
import { getClassNames } from '../../../utils/getClassNames';
import { SwCategory } from '../../../enums/enums';

const BASE_CLASS_NAME = 'select';
const selectControlClassName = `${BASE_CLASS_NAME}__control`;
const selectOptionClassName = `${BASE_CLASS_NAME}__option`;

export type OptionsType = Array<{ label: string; value: SwCategory }>;

export interface SelectPropsType {
  disabled?: boolean;
  invalid?: boolean;
  view?: 'primary';
  theme?: string;
  size?: Size;
  className?: string;
  state?: 'idle' | 'loading';
  loadingText?: string;
  options: OptionsType;
}

type SelectComponentProps = SelectPropsType & ComponentProps<'select'>;

const Select: FC<SelectComponentProps> = (props) => {
  const {
    disabled,
    invalid,
    view = 'primary',
    theme,
    size,
    className,
    state = 'idle',
    loadingText = 'Loading...',
    options,
    value = '',
    ...elementIntrinsicProps
  } = props;

  const classes = getClassNames({
    baseClass: BASE_CLASS_NAME,
    classMods: {
      invalid,
      disabled,
      view,
      theme,
      size,
    },
    mix: className,
  });

  const optionsArray = options.map((option) => (
    <option key={option.value} className={selectOptionClassName} value={option.value}>
      {option.label}
    </option>
  ));

  const currentOptions =
    state === 'loading' ? (
      <option value="" key={'loading'}>
        {loadingText}
      </option>
    ) : (
      optionsArray
    );

  const currentValue = state !== 'idle' ? '' : value;

  return (
    <div className={classes}>
      <select
        className={selectControlClassName}
        value={currentValue}
        disabled={disabled}
        {...elementIntrinsicProps}>
        {currentOptions}
      </select>
    </div>
  );
};

export default Select;
