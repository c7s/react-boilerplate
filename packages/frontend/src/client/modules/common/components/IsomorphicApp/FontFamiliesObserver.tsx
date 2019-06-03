import * as React from 'react';
import FontFaceObserver from 'fontfaceobserver';
import { FontFamily } from '../../lib/fonts';
import { fontFamilyConfig } from '../../lib/fonts/fontFamilyConfig';
import { Action, useAppDispatch } from '../AppStateProvider';

const FontFamiliesObserver = () => {
    const appDispatch = useAppDispatch();

    React.useEffect(() => {
        observeFontFamilies(appDispatch);
    }, [appDispatch]);

    return null;
};

function observeFontFamilies(dispatch: React.Dispatch<Action>) {
    Object.values(FontFamily).map(fontFamily => observeFontFamily(fontFamily, dispatch));
}

function observeFontFamily(fontFamily: FontFamily, dispatch: React.Dispatch<Action>) {
    Promise.all(
        fontFamilyConfig[fontFamily].variants.map(variant =>
            new FontFaceObserver(fontFamily, variant).load(fontFamilyConfig[fontFamily].testString, 60000).then(() =>
                dispatch({
                    type: 'FONT/VARIANT_LOADED',
                    value: {
                        fontFamily,
                        fontVariant: {
                            weight: variant.weight || 'normal',
                            style: variant.style || 'normal',
                            stretch: variant.stretch || 'normal',
                        },
                    },
                }),
            ),
        ),
    )
        .then(() => dispatch({ type: 'FONT/LOADED', value: fontFamily }))
        .catch(() =>
            console.warn(`All font variants of '${fontFamily}' are not available after 1 minute. Giving up...`),
        );
}

export { FontFamiliesObserver };
