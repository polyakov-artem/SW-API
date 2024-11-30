import './input.scss';
import { ClassModsType } from '../../../types/types';
import { ComponentProps, FC, ReactNode } from 'react';
import { getClassNames } from '../../../utils/getClassNames';

export const BASE_CLASS_NAME = 'input';
export const inputControlClassName = `${BASE_CLASS_NAME}__control`;
export const inputIconClassName = `${BASE_CLASS_NAME}__icon`;

export interface InputPropsType extends ComponentProps<'div'> {
  icon?: ReactNode;
  classMods?: ClassModsType & {
    'icon-after'?: boolean;
    'icon-before'?: boolean;
    invalid?: boolean;
    view?: 'primary';
  };
  controlProps?: ComponentProps<'input'>;
}

const Input: FC<InputPropsType> = (props) => {
  const { icon, className, classMods, controlProps, ...wrapIntrinsicProps } = props;

  const classes = getClassNames({
    baseClass: BASE_CLASS_NAME,
    classMods,
    mix: className,
  });

  return (
    <div className={classes} {...wrapIntrinsicProps} data-testid="input">
      <input className={inputControlClassName} {...controlProps} />
      {icon && <span className={inputIconClassName}>{icon}</span>}
    </div>
  );
};

export default Input;
