import { ComponentProps, FC } from 'react';
import { ClassModsType } from '../../../types/types';
import './select.scss';
import { getClassNames } from '../../../utils/getClassNames';
import classNames from 'classnames';

export const BASE_CLASS_NAME = 'select';
export const selectControlClassName = `${BASE_CLASS_NAME}__control`;
export const selectOptionClassName = `${BASE_CLASS_NAME}__option`;

export type OptionsType = Array<{ label: string; value: string }>;

export interface SelectPropsType extends ComponentProps<'div'> {
  classMods?: ClassModsType & {
    view?: 'primary';
    invalid?: boolean;
  };
  options?: OptionsType;
  controlProps?: ComponentProps<'select'>;
}

const Select: FC<SelectPropsType> = (props) => {
  const { classMods, className, options = [], controlProps, ...wrapIntrinsicProps } = props;

  const classes = getClassNames({
    baseClass: BASE_CLASS_NAME,
    classMods,
    mix: className,
  });

  const optionsArray = options.map((option) => (
    <option key={option.value} className={selectOptionClassName} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className={classes} {...wrapIntrinsicProps}>
      <select
        {...controlProps}
        className={classNames(selectControlClassName, controlProps?.className)}
        value={controlProps?.value || ''}>
        {optionsArray}
      </select>
    </div>
  );
};

export default Select;
