import './input.scss';
import { Size } from '../../../types/types';
import { ComponentProps, FC, ReactNode } from 'react';
import { getClassNames } from '../../../utils/getClassNames';

const BASE_CLASS_NAME = 'input';
const inputControlClassName = `${BASE_CLASS_NAME}__control`;
const inputIconClassName = `${BASE_CLASS_NAME}__icon`;

export interface InputPropsType {
  icon?: ReactNode;
  disabled?: boolean;
  invalid?: boolean;
  view?: string;
  theme?: string;
  size?: Size;
  className?: string;
  iconBefore?: boolean;
}

type InputComponentPropsType = InputPropsType & ComponentProps<'input'>;

const Input: FC<InputComponentPropsType> = (props) => {
  const {
    icon,
    disabled,
    invalid,
    view = 'primary',
    theme,
    size,
    iconBefore,
    className,
    ...intrinsicProps
  } = props;

  const iconPosMods = icon
    ? iconBefore
      ? { ['icon-before']: true }
      : { ['icon-after']: true }
    : {};

  const classes = getClassNames({
    baseClass: BASE_CLASS_NAME,
    classMods: {
      disabled,
      view,
      theme,
      size,
      invalid,
      ...iconPosMods,
    },
    mix: className,
  });

  return (
    <div className={classes}>
      <input className={inputControlClassName} disabled={disabled} {...intrinsicProps} />
      {icon && <span className={inputIconClassName}>{icon}</span>}
    </div>
  );
};

export default Input;
