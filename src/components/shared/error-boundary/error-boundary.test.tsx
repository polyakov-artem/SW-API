import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import ErrorBoundary from './error-boundary';
import { PropsWithChildren } from 'react';
import { NOT_FOUND_MESSAGE } from '../../../utils/load-data';
import userEvent from '@testing-library/user-event';
import { BASE_URL } from '../../../constants/constants';

const renderErrorBoundary = ({ children }: PropsWithChildren) =>
  render(<ErrorBoundary>{children}</ErrorBoundary>, { wrapper: MemoryRouter });

describe('ErrorBoundary', () => {
  describe('when there is no error', () => {
    test('should render children', () => {
      const testChild = <div>Test Child</div>;

      renderErrorBoundary({ children: testChild });

      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });
  });

  describe('when an error occurs', () => {
    test('should render error page, log an error and errorInfo', () => {
      const errorSpy = vi.spyOn(console, 'log');
      const error = new Error('Test error');

      const ErrorThrowingComponent = () => {
        throw error;
      };

      const { getByText, getByRole } = render(
        <MemoryRouter>
          <ErrorBoundary>
            <ErrorThrowingComponent />
          </ErrorBoundary>
        </MemoryRouter>
      );

      expect(getByText(/error/i)).toBeInTheDocument();
      expect(getByRole('button')).toBeInTheDocument();
      expect(errorSpy.mock.calls.some((call) => call.includes(error))).toBeTruthy();
      expect(errorSpy.mock.calls.some((call) => call.includes('errorInfo'))).toBeTruthy();
    });
  });

  describe(`when error message is '${NOT_FOUND_MESSAGE}'`, () => {
    test(`should navigate to not-found page`, () => {
      const TestComponent = () => {
        throw new Error(NOT_FOUND_MESSAGE);
      };

      const HomePage = () => (
        <ErrorBoundary>
          <div>Home</div>
          <TestComponent />
        </ErrorBoundary>
      );

      const NotFoundPage = () => <div>Not found</div>;

      render(
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path={`${BASE_URL}not-found-page`} element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
    });
  });

  describe('when an error occurs', () => {
    test('should update state with error in getDerivedStateFromError', () => {
      const error = new Error('Test error');
      const result = ErrorBoundary.getDerivedStateFromError(error);
      expect(result).toEqual({ error });
    });
  });

  describe('when the Reload button is clicked', () => {
    test('should reload the page', async () => {
      const originalReload = window.location.reload;
      window.location = {
        ...window.location,
        reload: vi.fn(),
      };

      const user = userEvent.setup();
      const ErrorComponent = () => {
        throw new Error('Test error');
      };
      const { getByText } = render(
        <MemoryRouter>
          <ErrorBoundary>
            <ErrorComponent />
          </ErrorBoundary>
        </MemoryRouter>
      );
      const reloadButton = getByText('Reload');

      await user.click(reloadButton);

      expect(window.location.reload).toHaveBeenCalledTimes(1);
      window.location.reload = originalReload;
    });
  });
});
