import { RouteObject } from 'react-router';
import ErrorBoundary from './components/shared/error-boundary/error-boundary';
import App from './App';
import ItemDetails from './components/ui/item-details/item-details';
import NotFoundPage from './pages/not-found-page/not-found-page';
import { BASE_URL } from './constants/constants';

const appWithErrorBoundary = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

const routes: RouteObject[] = [
  {
    path: `${BASE_URL}:category?`,
    element: appWithErrorBoundary,

    children: [
      {
        path: ':itemId',
        element: <ItemDetails />,
      },
    ],
  },
  {
    path: `${BASE_URL}not-found-page`,
    element: <NotFoundPage />,
  },
];

export default routes;
