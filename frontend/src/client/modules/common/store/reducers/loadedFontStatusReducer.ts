import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { FontFamily } from '../../../../fonts';
import { onFontLoad } from '../actions';
import { LoadedFontStatus } from '../types/index';

export const loadedFontStatusReducer = reducerWithInitialState<LoadedFontStatus>({}).case(
    onFontLoad,
    onFontLoadHandler,
);

function onFontLoadHandler(state: LoadedFontStatus, loadedFontFamily: FontFamily): LoadedFontStatus {
    return {
        ...state,
        [loadedFontFamily]: true,
    };
}
