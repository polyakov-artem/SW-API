import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TItem } from '../types/types';
import { AppDispatch, RootState } from './store';

export type TDownloadItemsState = Record<string, TItem>;

export const initialState: TDownloadItemsState = {};

export const SLICE_NAME = 'downloadItems';

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    itemAdded: (state, action: PayloadAction<TItem>) => {
      const item = action.payload;
      state[item.url] = item;
    },

    itemDeleted: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },

    itemsRemoved: () => {
      return initialState;
    },
  },
});

const { itemAdded, itemDeleted, itemsRemoved } = slice.actions;

export const addDownloadItem = (item: TItem) => (dispatch: AppDispatch) => {
  dispatch(itemAdded(item));
};

export const deleteDownloadItem = (url: string) => (dispatch: AppDispatch) => {
  dispatch(itemDeleted(url));
};

export const removeDownloadItems = () => (dispatch: AppDispatch) => {
  dispatch(itemsRemoved());
};

export const selectDownloadItems = (state: RootState) => state[SLICE_NAME];

export default slice.reducer;
