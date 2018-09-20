import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { FontFamily } from '../../../../fonts';
import { onFontLoad, onFontsLoadTimeout, onFontVariantLoad } from '../actions';
import { FontVariant, LoadedFontStatus } from '../types';

export const loadedFontStatusReducer = reducerWithInitialState<LoadedFontStatus>({
    fakeAllLoaded: { isAllVariantsAvailable: true, availableVariants: [] },
})
    .case(onFontLoad, onFontLoadHandler)
    .case(onFontVariantLoad, onFontVariantLoadHandler)
    .case(onFontsLoadTimeout, onFontsLoadTimeoutHandler);

function onFontLoadHandler(state: LoadedFontStatus, loadedFontFamily: FontFamily): LoadedFontStatus {
    return {
        ...state,
        [loadedFontFamily]: {
            ...state[loadedFontFamily],
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
            ...currentStatus,
            availableVariants: [
                ...(currentStatus ? currentStatus.availableVariants : []),
                loadedFontVariant.fontVariant,
            ],
        },
    };
}

function onFontsLoadTimeoutHandler(state: LoadedFontStatus): LoadedFontStatus {
    return {
        ...state,
        fakeAllLoaded: { isAllVariantsAvailable: false, availableVariants: [] },
    };
}
