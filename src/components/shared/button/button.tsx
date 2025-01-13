import './button.scss';
import { ComponentProps, FC, ReactNode } from 'react';
import { getClassNames } from '../../../utils/getClassNames';
import { TClassMods } from '../../../types/types';

export const BASE_CLASS_NAME = 'btn';
export const btnIconClassName = `${BASE_CLASS_NAME}__icon`;
export const btnInnerClassName = `${BASE_CLASS_NAME}__inner`;
export const btnTextClassName = `${BASE_CLASS_NAME}__text`;

export interface TButtonProps extends ComponentProps<'button'> {
  classMods?: TClassMods & {
    'icon-before'?: boolean;
    view?: 'primary';
  };
  icon?: ReactNode;
}

const Button: FC<TButtonProps> = (props) => {
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
