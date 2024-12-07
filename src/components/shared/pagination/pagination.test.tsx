import { render, screen } from '@testing-library/react';
import Pagination, {
  PaginationPropsType,
  btnDisabledClassName,
  btnSelectedClassName,
} from './pagination';
import userEvent from '@testing-library/user-event';

import reactRouterDom, { BrowserRouter } from 'react-router-dom';

const defaultProps: PaginationPropsType = {
  totalCount: 2,
  perPageCount: 1,
  maxNumOfVisiblePages: 7,
};

const renderPagination = (props: PaginationPropsType = defaultProps) => ({
  ...render(<Pagination {...props} />, { wrapper: BrowserRouter }),
  user: userEvent.setup(),
});

const getPaginationItems = () => screen.getAllByRole('listitem');
const getFirstPaginationLink = () => screen.getByRole('link', { name: '1' });
const getSecondPaginationLink = () => screen.getByRole('link', { name: '2' });
const getNextBtn = () => screen.getByText('»');
const getPrevBtn = () => screen.getByText('«');
const getCurrentPageParam = () => new URL(window.location.toString()).searchParams.get('page');
const mockSearchParamResult = (page: string) =>
  vi
    .spyOn(reactRouterDom, 'useSearchParams')
    .mockReturnValue([new URLSearchParams({ page }), vi.fn()]);

describe('Pagination', () => {
  describe('when number of pages is less than maximum number of pages to display', () => {
    test('should correctly render pagination without dots', () => {
      const { asFragment } = renderPagination();

      expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <ul
            class="pagination"
          >
            <li
              class="pagination__item"
            >
              <span
                class="pagination__btn pagination__btn-prev pagination__btn_disabled"
              >
                «
              </span>
            </li>
            <li
              class="pagination__item"
            >
              <a
                class="pagination__btn pagination__btn_selected"
                href="http://localhost:3000/?page=1"
              >
                1
              </a>
            </li>
            <li
              class="pagination__item"
            >
              <a
                class="pagination__btn"
                href="http://localhost:3000/?page=2"
              >
                2
              </a>
            </li>
            <li
              class="pagination__item"
            >
              <a
                class="pagination__btn pagination__btn-next"
                href="http://localhost:3000/?page=2"
              >
                »
              </a>
            </li>
          </ul>
        </DocumentFragment>
      `);
    });
  });

  describe('when there is no page parameter in the URL', () => {
    test('should render pagination with a default value of 1', () => {
      renderPagination();

      expect(getFirstPaginationLink()).toBeInTheDocument();
    });
  });

  describe('when page parameter is non-numeric', () => {
    test('should render pagination with a default value of 1', () => {
      mockSearchParamResult('abc');

      renderPagination();

      expect(getFirstPaginationLink()).toBeInTheDocument();
    });
  });

  describe('when page parameter is negative', () => {
    test('should render pagination with a default value of 1', () => {
      mockSearchParamResult('-10');

      renderPagination();

      expect(getFirstPaginationLink()).toBeInTheDocument();
    });
  });

  describe('when maxNumOfVisiblePages is less than 7', () => {
    test('should throw an error', () => {
      const props = {
        ...defaultProps,
        maxNumOfVisiblePages: 6,
      };

      expect(() => renderPagination(props)).toThrow();
    });
  });

  describe('when totalCount is less than or equal to perPageCount', () => {
    test('should not render pagination', () => {
      const { container } = renderPagination({ totalCount: 5, perPageCount: 10 });
      expect(container).toBeEmptyDOMElement();

      const { container: container2 } = renderPagination({ totalCount: 10, perPageCount: 10 });
      expect(container2).toBeEmptyDOMElement();
    });
  });

  describe('when maxNumOfVisiblePages is 7 and the total number of pages is more', () => {
    test('should render pagination component with 9 buttons (7 page buttons + 2 navigation buttons)', () => {
      renderPagination({
        totalCount: 10,
        perPageCount: 1,
        maxNumOfVisiblePages: 7,
      });

      expect(getPaginationItems()).toHaveLength(9);
    });
  });

  describe('when current page is 1', () => {
    test('previous button should have className for disabled state, location should not change when  when click on it', async () => {
      const { user } = renderPagination();

      await user.click(getFirstPaginationLink());
      expect(getCurrentPageParam()).toBe('1');
      await user.click(getPrevBtn());
      expect(getCurrentPageParam()).toBe('1');
      expect(getPrevBtn()).toHaveClass(btnDisabledClassName);
    });
  });

  describe('when current page is last', () => {
    test('next button should have className for disabled state, location should not change when when click on it', async () => {
      const { user } = renderPagination();
      await user.click(getSecondPaginationLink());

      expect(getCurrentPageParam()).toBe('2');
      await user.click(getNextBtn());
      expect(getCurrentPageParam()).toBe('2');
      expect(getNextBtn()).toHaveClass(btnDisabledClassName);
    });
  });

  describe('when current page is 1, user clicked on page 2 link', () => {
    test('should remove "selected" className from current button, add "selected" className to clicked btn, page param in URL should change', async () => {
      const { user } = renderPagination();
      const pageFirstLink = getFirstPaginationLink();
      const pageSecondLink = getSecondPaginationLink();

      await user.click(pageSecondLink);

      expect(getCurrentPageParam()).toBe('2');
      expect(pageSecondLink).toHaveClass(btnSelectedClassName);
      expect(pageFirstLink).not.toHaveClass(btnSelectedClassName);
    });
  });

  describe('when props current page is different', () => {
    test.each([
      { page: '1', expectedLabels: ['«', '1', '2', '3', '4', '5', '...', '10', '»'] },
      { page: '2', expectedLabels: ['«', '1', '2', '3', '4', '5', '...', '10', '»'] },
      { page: '3', expectedLabels: ['«', '1', '2', '3', '4', '5', '...', '10', '»'] },
      { page: '4', expectedLabels: ['«', '1', '...', '3', '4', '5', '...', '10', '»'] },
      { page: '5', expectedLabels: ['«', '1', '...', '4', '5', '6', '...', '10', '»'] },
      { page: '6', expectedLabels: ['«', '1', '...', '5', '6', '7', '...', '10', '»'] },
      { page: '7', expectedLabels: ['«', '1', '...', '6', '7', '8', '...', '10', '»'] },
      { page: '8', expectedLabels: ['«', '1', '...', '6', '7', '8', '9', '10', '»'] },
      { page: '9', expectedLabels: ['«', '1', '...', '6', '7', '8', '9', '10', '»'] },
      { page: '10', expectedLabels: ['«', '1', '...', '6', '7', '8', '9', '10', '»'] },
    ])(
      'should correctly render pagination when page is $page',
      async ({ page, expectedLabels }) => {
        mockSearchParamResult(page);

        renderPagination({
          totalCount: 10,
          perPageCount: 1,
          maxNumOfVisiblePages: 7,
        });

        const labels = screen.getAllByRole('listitem').map((item) => item.textContent);
        expect(labels).toEqual(expectedLabels);
      }
    );
  });
});
