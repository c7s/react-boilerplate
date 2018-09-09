import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { FontFamily } from '../../../../fonts';
import { fontLoad } from '../actions';
import { LoadedFontStatus } from '../types/index';

export const loadedFontStatusReducer = reducerWithInitialState<LoadedFontStatus>({}).case(fontLoad, fontLoadHandler);

function fontLoadHandler(state: LoadedFontStatus, loadedFontFamily: FontFamily): LoadedFontStatus {
    return {
        ...state,
        [loadedFontFamily]: true,
    };
}
