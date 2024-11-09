import './loader.scss';
import { ComponentProps, FC } from 'react';

import { Size } from '../../../types/types';
import { getClassNames } from '../../../utils/getClassNames';

const BASE_CLASS_NAME = 'loader';
const loaderContainerClassName = `${BASE_CLASS_NAME}__container`;

interface LoaderPropsType extends ComponentProps<'span'> {
  size?: Size;
}

const Loader: FC<LoaderPropsType> = (props) => {
  const { size, className, ...intrinsicProps } = props;

  const classes = getClassNames({
    baseClass: BASE_CLASS_NAME,
    classMods: { size },
    mix: className,
  });

  return (
    <span className={classes} {...intrinsicProps}>
      <span className={loaderContainerClassName}></span>
    </span>
  );
};

export default Loader;
