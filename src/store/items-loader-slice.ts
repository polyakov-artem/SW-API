import { createSlice } from '@reduxjs/toolkit';
import { SwCategory } from '../enums/enums';
import { TGetItemsResponsesMap } from '../types/types';
import { RootState } from './store';
import { getFetchBaseQueryErrorMsg } from '../utils/getFetchBaseQueryErrorMsg';

export type TItemsLoaderState = {
  isLoading: boolean;
  isError: boolean;
  error: string;
  data: null | TGetItemsResponsesMap[SwCategory];
};

export const initialState: TItemsLoaderState = {
  isLoading: false,
  isError: false,
  error: '',
  data: null,
};

export const SLICE_NAME = 'itemsLoader';

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    itemsLoadingStarted: () => {
      return { ...initialState, isLoading: true };
    },

    itemsLoadingFinished: (_, action) => {
      return {
        ...initialState,
        data: action.payload,
      };
    },

    itemsLoadingFailed: (_, action) => {
      return { ...initialState, isError: true, error: getFetchBaseQueryErrorMsg(action.payload) };
    },
  },
});

export const { itemsLoadingStarted, itemsLoadingFinished, itemsLoadingFailed } = slice.actions;

export const selectItemsLoader = (state: RootState) => state[SLICE_NAME];

export default slice.reducer;
