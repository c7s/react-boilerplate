import FontFaceObserver, { FontVariant } from 'fontfaceobserver';
import { Dictionary } from 'lodash';
import { css, injectGlobal } from 'styled-components';
import { IsomorphicStore } from '../IsomorphicStore';
import { fontLoad } from '../modules/common/store/actions';
import { LoadedFontStatus } from '../modules/common/store/types/index';
import bitter from './Bitter/index.css';

injectGlobal`
    ${bitter}
`;

enum TestString {
    LATIN = 'BESbwy',
    RUSSIAN = 'ИУЫицн',
}

enum FontFamily {
    BITTER = 'Bitter',
}

// Empty font variant means all values are 'normal'
const variantsMap: Dictionary<FontVariant[]> = {
    [FontFamily.BITTER]: [{}, { weight: 'bold' }, { style: 'italic' }],
};

const testStringMap: Dictionary<string> = {
    [FontFamily.BITTER]: TestString.LATIN,
};

Object.values(FontFamily).map(observeFontFamily);

function observeFontFamily(fontFamily: FontFamily) {
    Promise.all(
        variantsMap[fontFamily].map(variant =>
            new FontFaceObserver(fontFamily, variant).load(testStringMap[fontFamily], 60000),
        ),
    )
        .then(() => IsomorphicStore.getStore({ ssrMode: false }).dispatch(fontLoad(fontFamily)))
        .catch(() =>
            console.warn(`All font variants of \'${fontFamily}\' are not available after 1 minute. Giving up...`),
        );
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

function fontFamily(fontFamily: FontFamily) {
    return css`
        /* stylelint-disable declaration-colon-newline-after, value-list-max-empty-lines */
        font-family: ${() =>
            getFontFamilyStack(
                fontFamily,
                IsomorphicStore.getStore({ ssrMode: SSR_MODE }).getState().common.loadedFontStatus,
            )};
    `;
}

function getFontFamilyStack(fontFamily: FontFamily, loadedFontStatus: LoadedFontStatus) {
    return `${loadedFontStatus[fontFamily] ? `${fontFamily}, ` : ''}${getFallbackStack(fontFamily)}`;
}

export { FontFamily, fontFamily };
