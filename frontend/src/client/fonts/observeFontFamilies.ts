import FontFaceObserver from 'fontfaceobserver';
import { IsomorphicStore } from '../IsomorphicStore';
import { onFontLoad, onFontsLoadTimeout, onFontVariantLoad } from '../modules/common/store/actions';
import { FontFamily, fontFamilyConfig } from './fontFamilyConfig';

function observeFontFamilies() {
    window.setTimeout(() => {
        IsomorphicStore.getStore({ ssrMode: false }).dispatch(onFontsLoadTimeout());
    }, FONTS_LOAD_TIMEOUT_MS);

    Object.values(FontFamily).map(observeFontFamily);
}

function observeFontFamily(fontFamily: FontFamily) {
    Promise.all(
        fontFamilyConfig[fontFamily].variants.map(variant =>
            new FontFaceObserver(fontFamily, variant).load(fontFamilyConfig[fontFamily].testString, 60000).then(() =>
                IsomorphicStore.getStore({ ssrMode: false }).dispatch(
                    onFontVariantLoad({
                        fontFamily,
                        fontVariant: {
                            weight: variant.weight || 'normal',
                            style: variant.style || 'normal',
                            stretch: variant.stretch || 'normal',
                        },
                    }),
                ),
            ),
        ),
    )
        .then(() => IsomorphicStore.getStore({ ssrMode: false }).dispatch(onFontLoad(fontFamily)))
        .catch(() =>
            console.warn(`All font variants of \'${fontFamily}\' are not available after 1 minute. Giving up...`),
        );
}

export { observeFontFamilies };
