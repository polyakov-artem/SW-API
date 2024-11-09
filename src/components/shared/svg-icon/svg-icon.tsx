import { ComponentProps, FC } from 'react';
import './svg-icon.scss';
import { Size } from '../../../types/types';
import { getClassNames } from '../../../utils/getClassNames';

const BASE_CLASS_NAME = 'svg-icon';

interface SvgIconPropsType extends ComponentProps<'svg'> {
  view: string;
  size?: Size;
}

const SvgIcon: FC<SvgIconPropsType> = (props) => {
  const { view, size, className, ...elementIntrinsicProps } = props;

  const classes = getClassNames({
    baseClass: BASE_CLASS_NAME,
    classMods: { view, size },
    mix: className,
  });

  return (
    <svg className={classes} {...elementIntrinsicProps}>
      <use xlinkHref={`#${view}`} />
    </svg>
  );
};

export default SvgIcon;
