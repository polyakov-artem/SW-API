import { combineReducers } from 'redux';
import themeReducer from './theme-slice';
import itemsLoaderReducer from './items-loader-slice';
import itemFetcherReducer from './item-fetcher-slice';
import downloadItemsReducer from './download-items-slice';

import { api } from './api';

const reducer = combineReducers({
  theme: themeReducer,
  itemsLoader: itemsLoaderReducer,
  itemFetcher: itemFetcherReducer,
  downloadItems: downloadItemsReducer,
  [api.reducerPath]: api.reducer,
});

export default reducer;
