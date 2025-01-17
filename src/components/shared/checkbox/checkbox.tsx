import { ComponentProps, FC } from 'react';
import './checkbox.scss';
import { getClassNames } from '../../../utils/getClassNames';
import { TClassMods } from '../../../types/types';
import SvgIcon from '../svg-icon/svg-icon';

const BASE_CLASS_NAME = 'checkbox';
const checkboxBoxClassName = `${BASE_CLASS_NAME}__box`;
const checkboxTextClassName = `${BASE_CLASS_NAME}__text`;
const checkboxControlClassName = `${BASE_CLASS_NAME}__control`;
const checkboxCheck = `${BASE_CLASS_NAME}__check`;

export interface TCheckboxProps extends ComponentProps<'label'> {
  classMods?: TClassMods & {
    invalid?: boolean;
    view?: 'primary';
  };
  controlProps?: ComponentProps<'input'>;
}

const Checkbox: FC<TCheckboxProps> = (props) => {
  const { className, classMods, controlProps, children, htmlFor, ...labelIntrinsicProps } = props;

  const classes = getClassNames({
    baseClass: BASE_CLASS_NAME,
    classMods,
    mix: className,
  });

  return (
    <label className={classes} htmlFor={htmlFor} data-testid="checkbox" {...labelIntrinsicProps}>
      <input {...controlProps} type="checkbox" id={htmlFor} className={checkboxControlClassName} />
      <span className={checkboxBoxClassName}>
        <SvgIcon className={checkboxCheck} classMods={{ view: 'check' }} />
      </span>
      {!!children && <span className={checkboxTextClassName}>{children}</span>}
    </label>
  );
};

export default Checkbox;
