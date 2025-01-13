import { ComponentProps, FC } from 'react';
import './svg-icon.scss';
import { TClassMods } from '../../../types/types';
import { getClassNames } from '../../../utils/getClassNames';

export const BASE_CLASS_NAME = 'svg-icon';

export interface TSvgIconProps extends ComponentProps<'svg'> {
  classMods?: TClassMods;
}

const SvgIcon: FC<TSvgIconProps> = (props) => {
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
