import { combineReducers } from 'redux';
import { isRootVisitedReducer } from './isRootVisitedReducer';
import { loadedFontStatusReducer } from './loadedFontStatusReducer';

export const commonReducer = combineReducers({
    loadedFontStatus: loadedFontStatusReducer,
    isRootVisited: isRootVisitedReducer,
});
