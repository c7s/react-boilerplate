import normalize from 'normalize.css';
import { css, injectGlobal } from 'styled-components';
import { fontFamily, FontFamily } from '../fonts';
import { Width } from '../media';

const globalCss = css`
    /* Default font and min-width */
    body {
        ${fontFamily(FontFamily.BITTER)};
        min-width: ${Width.S}px;
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
