import './button.scss';
import { ComponentProps, FC, ReactNode } from 'react';
import { getClassNames } from '../../../utils/getClassNames';
import { ClassModsType } from '../../../types/types';

export const BASE_CLASS_NAME = 'btn';
export const btnIconClassName = `${BASE_CLASS_NAME}__icon`;
export const btnInnerClassName = `${BASE_CLASS_NAME}__inner`;
export const btnTextClassName = `${BASE_CLASS_NAME}__text`;

export interface ButtonPropsType extends ComponentProps<'button'> {
  classMods?: ClassModsType & {
    'icon-before'?: boolean;
    view?: 'primary';
  };
  icon?: ReactNode;
}

const Button: FC<ButtonPropsType> = (props) => {
  const { disabled, classMods, className, icon, children, ...btnIntrinsicProps } = props;

  const classes = getClassNames({
    baseClass: BASE_CLASS_NAME,
    classMods,
    mix: className,
  });

  return (
    <button className={classes} disabled={disabled} {...btnIntrinsicProps}>
      <span className={btnInnerClassName}>
        <span className={btnTextClassName}>{children}</span>
        {icon && <span className={btnIconClassName}>{icon}</span>}
      </span>
    </button>
  );
};

export default Button;
