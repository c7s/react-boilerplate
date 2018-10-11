import { combineReducers } from 'redux';
import { loadedFontStatusReducer } from './loadedFontStatusReducer';
import { mediaReducer } from './mediaReducer';

export const commonReducer = combineReducers({
    loadedFontStatus: loadedFontStatusReducer,
    media: mediaReducer,
});
