import { combineReducers } from 'redux';
import { loadedFontStatusReducer } from './loadedFontStatusReducer';
import { messagesReducer } from './messagesReducer';

export const commonReducer = combineReducers({
    loadedFontStatus: loadedFontStatusReducer,
    messages: messagesReducer,
});
