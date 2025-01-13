import { RouteObject } from 'react-router';
import ErrorBoundary from './components/shared/error-boundary/error-boundary';
import App from './App';
import ItemDetails from './components/ui/item-details/item-details';
import NotFoundPage from './pages/not-found-page/not-found-page';
import { PUBLIC_PATH } from './constants/constants';

const appWithErrorBoundary = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

const routes: RouteObject[] = [
  {
    path: `${PUBLIC_PATH}:category?`,
    element: appWithErrorBoundary,

    children: [
      {
        path: ':itemId',
        element: <ItemDetails />,
      },
    ],
  },
  {
    path: `${PUBLIC_PATH}not-found-page`,
    element: <NotFoundPage />,
  },
];

export default routes;
