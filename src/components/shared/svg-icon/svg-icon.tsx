import { ComponentProps, FC } from 'react';
import './svg-icon.scss';
import { ClassModsType } from '../../../types/types';
import { getClassNames } from '../../../utils/getClassNames';

export const BASE_CLASS_NAME = 'svg-icon';

export interface SvgIconPropsType extends ComponentProps<'svg'> {
  classMods?: ClassModsType;
}

const SvgIcon: FC<SvgIconPropsType> = (props) => {
  const { classMods, className, ...intrinsicProps } = props;

  const classes = getClassNames({
    baseClass: BASE_CLASS_NAME,
    classMods,
    mix: className,
  });

  return (
    <svg className={classes} {...intrinsicProps}>
      <use xlinkHref={`#${classMods?.view}`} />
    </svg>
  );
};

export default SvgIcon;
