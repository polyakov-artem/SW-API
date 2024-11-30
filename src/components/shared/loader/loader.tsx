import './loader.scss';
import { ComponentProps, FC } from 'react';

import { ClassModsType } from '../../../types/types';
import { getClassNames } from '../../../utils/getClassNames';

export const BASE_CLASS_NAME = 'loader';
export const loaderContainerClassName = `${BASE_CLASS_NAME}__container`;

interface LoaderPropsType extends ComponentProps<'span'> {
  classMods?: ClassModsType;
}

const Loader: FC<LoaderPropsType> = (props) => {
  const { classMods, className, ...intrinsicProps } = props;

  const classes = getClassNames({
    baseClass: BASE_CLASS_NAME,
    classMods,
    mix: className,
  });

  return (
    <span className={classes} {...intrinsicProps}>
      <span className={loaderContainerClassName}></span>
    </span>
  );
};

export default Loader;
