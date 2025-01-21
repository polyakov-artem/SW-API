import './theme-switcher.scss';
import { ComponentProps, FC, useCallback, useEffect, useState } from 'react';
import localStorageService from '../../../services/local-storage-service';
import Switch from '../../shared/switch/switch';
import classNames from 'classnames';

export const ATTRIBUTE_KEY = 'theme';
export const BASE_CLASS_NAME = 'theme-switcher';
export const onBtn = `${BASE_CLASS_NAME}__on-btn`;
export const offBtn = `${BASE_CLASS_NAME}__off-btn`;
export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';
export const testId = 'theme-switcher';

const ThemeSwitcher: FC<ComponentProps<'div'>> = (props) => {
  const [theme, setTheme] = useState(localStorageService.getData(ATTRIBUTE_KEY) || LIGHT_THEME);

  const { className, ...restProps } = props;
  const classes = classNames(BASE_CLASS_NAME, className);

  useEffect(() => {
    const html = document.documentElement;
    const currentHtmlValue = html.getAttribute(ATTRIBUTE_KEY);

    if (currentHtmlValue !== theme) {
      html.setAttribute(ATTRIBUTE_KEY, theme);
      localStorageService.saveData(ATTRIBUTE_KEY, theme);
    }
  }, [theme]);

  const handleChange = useCallback(() => {
    setTheme((prevState) => (prevState === LIGHT_THEME ? DARK_THEME : LIGHT_THEME));
  }, []);

  return (
    <div className={classes} {...restProps} data-testid={testId}>
      <span className={offBtn}>🌞</span>
      <Switch
        controlProps={{ checked: theme === DARK_THEME, onChange: handleChange }}
        classMods={{ view: 'primary' }}
      />
      <span className={onBtn}>🌙</span>
    </div>
  );
};

export default ThemeSwitcher;
