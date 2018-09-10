import { css } from 'styled-components';
import { LoadedFontStatus } from '../modules/common/store/types';
import { FontFamily } from './index';

function fontFamily<T>(fontFamily: FontFamily) {
    return css`
        /* stylelint-disable declaration-colon-newline-after, value-list-max-empty-lines */
        font-family: ${({ loadedFontStatus }: T & { loadedFontStatus: LoadedFontStatus }) =>
            getFontFamilyStack(fontFamily, loadedFontStatus)};
    `;
}

function getFontFamilyStack(fontFamily: FontFamily, loadedFontStatus: LoadedFontStatus) {
    return `${loadedFontStatus[fontFamily] ? `${fontFamily}, ` : ''}${getFallbackStack(fontFamily)}`;
}

function getFallbackStack(fontFamily: FontFamily): string {
    let stack = '';

    switch (fontFamily) {
        case FontFamily.BITTER:
        default:
            stack = 'Tahoma, Arial, sans-serif';
    }

    return stack;
}

export { fontFamily };
