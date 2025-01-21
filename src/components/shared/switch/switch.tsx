import './switch.scss';
import { ComponentProps, FC } from 'react';
import { TClassMods } from '../../../types/types';
import { getClassNames } from '../../../utils/getClassNames';

export const BASE_CLASS_NAME = 'switch';
export const controlClassName = `${BASE_CLASS_NAME}__control`;
export const boxClassName = `${BASE_CLASS_NAME}__box`;
export const textClassName = `${BASE_CLASS_NAME}__text`;

export interface TSwitchProps extends ComponentProps<'label'> {
  classMods?: TClassMods & {
    invalid?: boolean;
    view?: 'primary';
  };
  controlProps?: ComponentProps<'input'>;
}

const Switch: FC<TSwitchProps> = (props) => {
  const { className, classMods, controlProps, children, htmlFor, ...labelIntrinsicProps } = props;

  const classes = getClassNames({
    baseClass: BASE_CLASS_NAME,
    classMods,
    mix: className,
  });

  return (
    <label className={classes} htmlFor={htmlFor} data-testid="switch" {...labelIntrinsicProps}>
      <input {...controlProps} className={controlClassName} type="checkbox" id={htmlFor} />
      <span className={boxClassName} />
      {!!children && <span className={textClassName}>{children}</span>}
    </label>
  );
};

export default Switch;
