import { RouteObject } from 'react-router';
import ErrorBoundary from './components/shared/error-boundary/error-boundary';
import App from './App';
import ItemDetails from './components/ui/item-details/item-details';
import NotFoundPage from './pages/not-found-page/not-found-page';
import { PUBLIC_PATH } from './constants/constants';
import { SwCategory } from './enums/enums';

const appWithErrorBoundary = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

const generateCategoriesRoutes = (publicPath: string, categories: string[]) => {
  return categories.map((category) => {
    return {
      path: `${publicPath}${category}`,
      element: appWithErrorBoundary,
      children: [
        {
          path: ':itemId',
          element: <ItemDetails />,
        },
      ],
    };
  });
};

const routes: RouteObject[] = [
  {
    path: `${PUBLIC_PATH}`,
    element: appWithErrorBoundary,
  },
  ...generateCategoriesRoutes(PUBLIC_PATH, Object.values(SwCategory)),
  {
    path: `${PUBLIC_PATH}not-found-page`,
    element: <NotFoundPage />,
  },
  {
    path: `*`,
    element: <NotFoundPage />,
  },
];

export default routes;
