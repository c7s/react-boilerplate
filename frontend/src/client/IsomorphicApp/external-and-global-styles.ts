import normalize from 'normalize.css';
import { css, injectGlobal } from 'styled-components';
import { fontFamily, FontFamily } from '../fonts';

const globalCss = css`
    /* Default font */
    body {
        ${fontFamily(FontFamily.BITTER)};
    }

    /* Default box-sizing */
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
`;

injectGlobal`
    /* stylelint-disable max-empty-lines */
    ${normalize};
    ${globalCss};
`;
