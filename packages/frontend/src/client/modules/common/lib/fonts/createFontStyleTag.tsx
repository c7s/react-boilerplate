import * as React from 'react';
import Helmet from 'react-helmet';
import { createGlobalStyle } from 'styled-components';

const createFontStyleTag: typeof createGlobalStyle = (strings, ...interpolations) => {
    return (() => (
        <Helmet>
            <style>
                {String.raw(
                    strings,
                    ...interpolations.map(
                        interpolation => (Array.isArray(interpolation) ? interpolation.join('') : interpolation),
                    ),
                )}
            </style>
        </Helmet>
    )) as any;
};

// See https://github.com/styled-components/styled-components/issues/1593
// TODO: remove this hack once issue resolved
const createGlobalFontsStyle = process.env.NODE_ENV === 'development' ? createFontStyleTag : createGlobalStyle;

export { createGlobalFontsStyle };
