import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { FontFamily } from '../../../../fonts';
import { onFontLoad, onFontsLoadTimeout } from '../actions';
import { LoadedFontStatus } from '../types/index';

export const loadedFontStatusReducer = reducerWithInitialState<LoadedFontStatus>({ fakeAllLoaded: true })
    .case(onFontLoad, onFontLoadHandler)
    .case(onFontsLoadTimeout, onFontsLoadTimeoutHandler);

function onFontLoadHandler(state: LoadedFontStatus, loadedFontFamily: FontFamily): LoadedFontStatus {
    return {
        ...state,
        [loadedFontFamily]: true,
    };
}

function onFontsLoadTimeoutHandler(state: LoadedFontStatus): LoadedFontStatus {
    return {
        ...state,
        fakeAllLoaded: false,
    };
}
