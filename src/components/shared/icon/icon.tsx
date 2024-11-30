import './icon.scss';
import { ComponentProps, FC } from 'react';
import { getClassNames } from '../../../utils/getClassNames';
import { ClassModsType } from '../../../types/types';

export const BASE_CLASS_NAME = 'icon';

export interface IconPropsType extends ComponentProps<'span'> {
  classMods?: ClassModsType;
}

const Icon: FC<IconPropsType> = (props) => {
  const { classMods, className, ...intrinsicProps } = props;

  const classes = getClassNames({
    baseClass: BASE_CLASS_NAME,
    classMods,
    mix: className,
  });

  return <span className={classes} {...intrinsicProps} />;
};

export default Icon;
