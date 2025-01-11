import { combineReducers } from 'redux';
import themeReducer from './theme-slice';

const reducer = combineReducers({ theme: themeReducer });

export default reducer;
