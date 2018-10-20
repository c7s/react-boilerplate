import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { FontFamily } from '../../lib/fonts';
import { onFontLoad, onFontVariantLoad } from '../actions';
import { FontVariant, LoadedFontStatus } from '../types';

export const loadedFontStatusReducer = reducerWithInitialState<LoadedFontStatus>({})
    .case(onFontLoad, onFontLoadHandler)
    .case(onFontVariantLoad, onFontVariantLoadHandler);

function onFontLoadHandler(state: LoadedFontStatus, loadedFontFamily: FontFamily): LoadedFontStatus {
    const currentStatus = state[loadedFontFamily];

    return {
        ...state,
        [loadedFontFamily]: {
            availableVariants: currentStatus ? currentStatus.availableVariants : [],
            isAllVariantsAvailable: true,
        },
    };
}

function onFontVariantLoadHandler(
    state: LoadedFontStatus,
    loadedFontVariant: { fontFamily: FontFamily; fontVariant: FontVariant },
): LoadedFontStatus {
    const currentStatus = state[loadedFontVariant.fontFamily];

    return {
        ...state,
        [loadedFontVariant.fontFamily]: {
            availableVariants: [
                ...(currentStatus ? currentStatus.availableVariants : []),
                loadedFontVariant.fontVariant,
            ],
            isAllVariantsAvailable: currentStatus ? currentStatus.isAllVariantsAvailable : false,
        },
    };
}
