import { render, screen } from '@testing-library/react';
import NotFoundBanner from './not-found-banner';
import { MemoryRouter, Route, Routes } from 'react-router';
import userEvent from '@testing-library/user-event';
import { PUBLIC_PATH } from '../../../constants/constants';

const getHomeButton = () => screen.getByRole('button', { name: /Home/i });

describe('NotFoundBanner', () => {
  describe('when rendered', () => {
    test('should correctly display all elements', () => {
      const { baseElement } = render(<NotFoundBanner />, { wrapper: MemoryRouter });

      expect(baseElement.querySelector('.not-found-banner')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /not found/i })).toBeInTheDocument();
      expect(getHomeButton()).toBeInTheDocument();
    });
  });

  describe('when the Home button is clicked', () => {
    test('should navigate to the home page', async () => {
      const user = userEvent.setup();
      const notFoundPath = `${PUBLIC_PATH}notFound`;

      render(
        <MemoryRouter initialEntries={[notFoundPath]}>
          <Routes>
            <Route path={PUBLIC_PATH} element={<div>Home</div>} />
            <Route path={notFoundPath} element={<NotFoundBanner />} />
          </Routes>
        </MemoryRouter>
      );

      await user.click(getHomeButton());

      expect(screen.getByText(/home/i)).toBeInTheDocument();
    });
  });
});
