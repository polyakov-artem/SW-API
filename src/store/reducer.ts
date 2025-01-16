import { combineReducers } from 'redux';
import themeReducer from './theme-slice';
import itemsLoaderReducer from './items-loader-slice';
import { api } from './api';

const reducer = combineReducers({
  theme: themeReducer,
  itemsLoader: itemsLoaderReducer,
  [api.reducerPath]: api.reducer,
});

export default reducer;
