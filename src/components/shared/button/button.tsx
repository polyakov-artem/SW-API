import './button.scss';
import { ComponentProps, FC, ReactNode } from 'react';
import { Size } from '../../../types/types';
import { getClassNames } from '../../../utils/getClassNames';

export const BASE_CLASS_NAME = 'btn';
export const btnIconClassName = `${BASE_CLASS_NAME}__icon`;
export const btnInnerClassName = `${BASE_CLASS_NAME}__inner`;
export const btnTextClassName = `${BASE_CLASS_NAME}__text`;

export interface ButtonPropsType {
  disabled?: boolean;
  view?: string;
  theme?: string;
  size?: Size;
  iconBefore?: boolean;
  className?: string;
  children?: ReactNode;
  state?: 'idle' | 'loading';
  icon?: ReactNode;
  loadingIcon?: ReactNode;
}

type ButtonComponentPropsType = ButtonPropsType & ComponentProps<'button'>;
type ButtonInnerPropsType = { icon?: ReactNode; children?: ReactNode };

const Button: FC<ButtonComponentPropsType> = (props) => {
  const {
    disabled,
    view = 'primary',
    theme,
    size,
    iconBefore = false,
    className,
    children,
    state = 'idle',
    icon,
    loadingIcon,
    ...intrinsicProps
  } = props;

  const classes = getClassNames({
    baseClass: BASE_CLASS_NAME,
    classMods: {
      view,
      theme,
      size,
      disabled,
      'icon-before': iconBefore,
    },
    mix: className,
  });

  const currentIcon = state === 'idle' ? icon : loadingIcon;

  return (
    <button className={classes} disabled={disabled} {...intrinsicProps}>
      <ButtonInner icon={currentIcon}>{children}</ButtonInner>
    </button>
  );
};

export const ButtonInner = (props: ButtonInnerPropsType) => {
  const { children, icon } = props;

  return (
    <span className={btnInnerClassName}>
      <span className={btnTextClassName}>{children}</span>
      {icon && <span className={btnIconClassName}>{icon}</span>}
    </span>
  );
};

export default Button;
