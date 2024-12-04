import { render, screen } from '@testing-library/react';
import ErrorComponent from './error-component';
import userEvent from '@testing-library/user-event';

const getButton = () => screen.getByRole('button', { name: /error/i });

describe('ErrorComponent', () => {
  describe('at the first rendering', () => {
    test('should render the component without errors', () => {
      render(<ErrorComponent />);

      expect(getButton()).toBeInTheDocument();
    });
  });

  describe('when the button is clicked', () => {
    it('should result in a runtime error', async () => {
      const user = userEvent.setup();
      render(<ErrorComponent />);

      await expect(
        (async () => {
          await user.click(getButton());
        })()
      ).rejects.toThrow();
    });
  });
});
