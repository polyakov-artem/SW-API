import './loader.scss';
import { ComponentProps, FC } from 'react';

import { TClassMods } from '../../../types/types';
import { getClassNames } from '../../../utils/getClassNames';

export const BASE_CLASS_NAME = 'loader';
export const loaderContainerClassName = `${BASE_CLASS_NAME}__container`;

export interface TLoaderProps extends ComponentProps<'span'> {
  classMods?: TClassMods;
}

const Loader: FC<TLoaderProps> = (props) => {
  const { classMods, className, ...intrinsicProps } = props;

  const classes = getClassNames({
    baseClass: BASE_CLASS_NAME,
    classMods,
    mix: className,
  });

  return (
    <span className={classes} {...intrinsicProps} data-testid="loader">
      <span className={loaderContainerClassName}></span>
    </span>
  );
};

export default Loader;
