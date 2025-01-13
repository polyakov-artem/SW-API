import { render, screen } from '@testing-library/react';
import ErrorBoundary from './error-boundary';
import { PropsWithChildren } from 'react';
import userEvent from '@testing-library/user-event';

const renderErrorBoundary = ({ children }: PropsWithChildren) =>
  render(<ErrorBoundary>{children}</ErrorBoundary>);

describe('ErrorBoundary', () => {
  describe('when there is no error', () => {
    test('should render children', () => {
      const testChild = 'Test Child';

      renderErrorBoundary({ children: testChild });

      expect(screen.getByText(testChild)).toBeInTheDocument();
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
        <ErrorBoundary>
          <ErrorThrowingComponent />
        </ErrorBoundary>
      );

      expect(getByText(/error/i)).toBeInTheDocument();
      expect(getByRole('button', { name: /Reload/i })).toBeInTheDocument();
      expect(errorSpy.mock.calls.some((call) => call.includes(error))).toBeTruthy();
      expect(errorSpy.mock.calls.some((call) => call.includes('errorInfo'))).toBeTruthy();
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
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );
      const reloadButton = getByText('Reload');

      await user.click(reloadButton);

      expect(window.location.reload).toHaveBeenCalledTimes(1);
      window.location.reload = originalReload;
    });
  });
});
