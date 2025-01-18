import { describe, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import DownloadDialog, { BASE_CLASS_NAME, dialogTestId } from './download-dialog';
import * as downloadDataModule from '../../../utils/download-data';
import store from '../../../store/store';
import { addDownloadItem } from '../../../store/download-items-slice';
import { TItem } from '../../../types/types';
import { act } from 'react';
import { renderWithRouter } from '../../../utils/test/render-with-router';

vi.mock('../../../utils/download-data', () => ({
  downloadData: vi.fn(),
}));

const className = 'parent__dialog';

const renderDownloadDialog = () => {
  return {
    dispatch: store.dispatch,
    getState: store.getState,
    ...renderWithRouter(
      <Provider store={store}>
        <DownloadDialog className={className} />
      </Provider>,
      { route: '/SW-API/films' }
    ),
  };
};

const getDialog = () => screen.getByTestId(dialogTestId);
const getUnselectBtn = () => screen.getByRole('button', { name: /unselect/i });
const getDownloadBtn = () => screen.getByRole('button', { name: /download/i });
const addItem = (url: string, title: string) => addDownloadItem({ url, title } as TItem);

describe('DownloadDialog', () => {
  describe('when renders with 0 items in the store', () => {
    test('should render correctly', () => {
      renderDownloadDialog();

      expect(getDialog()).toHaveClass(`${BASE_CLASS_NAME} ${className}`);
      expect(getUnselectBtn()).toBeInTheDocument();
      expect(getDownloadBtn()).toBeInTheDocument();
      expect(screen.getByText('No items selected')).toBeInTheDocument();
    });
  });

  describe('when adding items to the store', () => {
    test('should render correct message', () => {
      const { dispatch } = renderDownloadDialog();

      act(() => {
        dispatch(addItem('url_1', 'title_1'));
      });

      expect(screen.getByText('1 item is selected')).toBeInTheDocument();

      act(() => {
        dispatch(addItem('url_2', 'title_2'));
      });

      expect(screen.getByText('2 items selected')).toBeInTheDocument();
    });
  });

  describe('when clicking on the unselect button', async () => {
    test(`should remove download items from the store and change message to '0 item is selected'`, async () => {
      const { dispatch, user } = renderDownloadDialog();
      act(() => {
        dispatch(addItem('url_1', 'title_1'));
        dispatch(addItem('url_2', 'title_2'));
      });

      await user.click(getUnselectBtn());

      expect(screen.getByText('No items selected')).toBeInTheDocument();
    });
  });

  describe('when clicking on the download button', async () => {
    test(`should call downloadData function and pass data with correct filename`, async () => {
      const { dispatch, user } = renderDownloadDialog();
      const items = [
        {
          url: 'url_1',
          title: 'title_1',
        },
        {
          url: 'url_2',
          title: 'title_2',
        },
      ];

      act(() => {
        items.forEach(({ url, title }) => dispatch(addItem(url, title)));
      });

      await user.click(getDownloadBtn());

      expect(downloadDataModule.downloadData).toHaveBeenCalledWith('2_films', items);
    });
  });
});
