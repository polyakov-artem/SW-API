import { createSlice } from '@reduxjs/toolkit';
import { SwCategory } from '../enums/enums';
import { TFetchItemResponsesMap } from '../types/types';
import { RootState } from './store';

import { getFetchBaseQueryErrorMsg } from '../utils/getFetchBaseQueryErrorMsg';

export type TItemFetcherState = {
  isLoading: boolean;
  isError: boolean;
  error: string;
  data: null | TFetchItemResponsesMap[SwCategory];
};

export const initialState: TItemFetcherState = {
  isLoading: false,
  isError: false,
  error: '',
  data: null,
};

export const SLICE_NAME = 'itemFetcher';

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    itemFetchBegan: () => {
      return { ...initialState, isLoading: true };
    },

    itemFetchSucceeded: (_, action) => {
      return {
        ...initialState,
        data: action.payload,
      };
    },

    itemFetchFailed: (_, action) => {
      return {
        ...initialState,
        isError: true,
        error: getFetchBaseQueryErrorMsg(action.payload),
      };
    },
  },
});

export const { itemFetchBegan, itemFetchSucceeded, itemFetchFailed } = slice.actions;

export const selectItemFetcher = (state: RootState) => state[SLICE_NAME];

export default slice.reducer;
