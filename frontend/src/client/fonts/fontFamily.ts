import { css } from 'styled-components';
import { LoadedFontStatus } from '../modules/common/store/types';
import { FontFamily, fontFamilyConfig } from './fontFamilyConfig';

function fontFamily<T>(fontFamily: FontFamily) {
    return css`
        /* stylelint-disable declaration-colon-newline-after, value-list-max-empty-lines */
        font-family: ${({ loadedFontStatus }: T & { loadedFontStatus: LoadedFontStatus }) =>
            getFontFamilyStack(fontFamily, loadedFontStatus)};
    `;
}

function getFontFamilyStack(fontFamily: FontFamily, loadedFontStatus: LoadedFontStatus) {
    return `${!IS_PREVENT_FOIT || loadedFontStatus[fontFamily] ? `${fontFamily}, ` : ''}${
        fontFamilyConfig[fontFamily].fallbackStack
    }`;
}

export { fontFamily };
