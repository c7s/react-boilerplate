import normalize from 'normalize.css';
import { css, injectGlobal } from 'styled-components';
import { fontFamily, FontFamily } from '../../lib/fonts';
import { MIN_WIDTH } from '../../lib/media';

const globalCss = css`
    /* Default font and min-width */
    body {
        ${fontFamily(FontFamily.BITTER)};
        min-width: ${MIN_WIDTH}px;
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
