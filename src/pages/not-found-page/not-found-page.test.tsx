import { render, screen } from '@testing-library/react';
import NotFoundPage from './not-found-page';
import { MemoryRouter } from 'react-router';

describe('NotFoundPage', () => {
  describe('when renders', () => {
    test('should render with correct classes, tag, and child components', () => {
      render(<NotFoundPage />, { wrapper: MemoryRouter });

      const mainEl = screen.getByRole('main');
      expect(mainEl).toHaveClass('not-found-page container');
      expect(mainEl.tagName).toBe('MAIN');
      expect(screen.getByRole('heading', { name: /not found/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Home/i })).toBeInTheDocument();
    });
  });
});
