import { combineReducers } from 'redux';
import { isRootVisitedReducer } from './isRootVisitedReducer';
import { loadedFontStatusReducer } from './loadedFontStatusReducer';
import { mediaReducer } from './mediaReducer';

export const commonReducer = combineReducers({
    loadedFontStatus: loadedFontStatusReducer,
    media: mediaReducer,
    isRootVisited: isRootVisitedReducer,
});
