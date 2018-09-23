import normalize from 'normalize.css';
import { css, injectGlobal } from 'styled-components';
import { fontFamily, FontFamily } from '../fonts';

const globalCss = css`
    body {
        ${fontFamily(FontFamily.BITTER)};
    }
`;

injectGlobal`
    /* stylelint-disable max-empty-lines */
    ${normalize};
    ${globalCss};
`;
