import { combineReducers } from 'redux';
import { loadedFontStatusReducer } from './loadedFontStatusReducer';
import { mediaReducer } from './mediaReducer';
import { messagesReducer } from './messagesReducer';

export const commonReducer = combineReducers({
    loadedFontStatus: loadedFontStatusReducer,
    media: mediaReducer,
    messages: messagesReducer,
});
