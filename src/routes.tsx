import { RouteObject } from 'react-router';
import ErrorBoundary from './components/shared/error-boundary/error-boundary';
import App from './App';

const appWithErrorBoundary = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

const routes: RouteObject[] = [
  {
    path: '/:category?',
    element: appWithErrorBoundary,
    children: [
      {
        path: ':itemId',
        element: <h1>Item details</h1>,
      },
    ],
  },
];

export default routes;
