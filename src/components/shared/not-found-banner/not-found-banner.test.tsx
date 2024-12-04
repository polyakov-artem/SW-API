import { render, screen } from '@testing-library/react';
import NotFoundBanner from './not-found-banner';
import { MemoryRouter, Route, Routes } from 'react-router';
import userEvent from '@testing-library/user-event';

const getButton = () => screen.getByRole('button', { name: /Home/i });

describe('NotFoundBanner', () => {
  describe('when rendered', () => {
    test('should correctly display all elements', () => {
      const { baseElement } = render(<NotFoundBanner />, { wrapper: MemoryRouter });

      expect(baseElement.querySelector('.not-found-banner')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /not found/i })).toBeInTheDocument();
      expect(getButton()).toBeInTheDocument();
    });
  });

  describe('when the Home button is clicked', () => {
    test('should navigate to the home page', async () => {
      const Home = () => <div>Home</div>;
      const NotFound = () => <NotFoundBanner />;
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={['/notFound']}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notFound" element={<NotFound />} />
          </Routes>
        </MemoryRouter>
      );

      await user.click(getButton());

      expect(screen.getByText(/home/i)).toBeInTheDocument();
    });
  });
});
