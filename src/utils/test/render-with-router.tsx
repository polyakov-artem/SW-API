import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

export const renderWithRouter = (ui: ReactNode, { route = '/', options = {} } = {}) => {
  window.history.pushState({}, 'Test page', route);

  const rendered = render(ui, { ...options, wrapper: BrowserRouter });
  const prevRoute = route;
  const prevOptions = options;

  return {
    user: userEvent.setup(),
    ...rendered,
    rerender: (ui: ReactNode, { route = prevRoute, options = prevOptions } = {}) =>
      renderWithRouter(ui, { route, options: { container: rendered.container, ...options } }),
  };
};
