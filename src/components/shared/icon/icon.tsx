import './icon.scss';
import { ComponentProps, FC } from 'react';
import { Size } from '../../../types/types';
import { getClassNames } from '../../../utils/getClassNames';

const BASE_CLASS_NAME = 'icon';

interface IconPropsType extends ComponentProps<'span'> {
  view: string;
  size?: Size;
}

const Icon: FC<IconPropsType> = (props) => {
  const { view, size, className, ...intrinsicProps } = props;

  const classes = getClassNames({
    baseClass: BASE_CLASS_NAME,
    classMods: { view, size },
    mix: className,
  });

  return <span className={classes} {...intrinsicProps} />;
};

export default Icon;
