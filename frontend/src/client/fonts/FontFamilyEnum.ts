import FontFaceObserver, { FontVariant } from 'fontfaceobserver';
import { Dictionary } from 'lodash';
import { injectGlobal } from 'styled-components';
import { IsomorphicStore } from '../IsomorphicStore';
import { fontLoad } from '../modules/common/store/actions';
import bitter from './Bitter/index.css';

enum FontFamily {
    BITTER = 'Bitter',
}

injectGlobal`
    ${bitter}
`;

enum TestString {
    LATIN = 'BESbwy',
    RUSSIAN = 'ИУЫицн',
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

export { FontFamily };
