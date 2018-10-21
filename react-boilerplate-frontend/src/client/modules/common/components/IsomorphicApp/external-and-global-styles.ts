import minireset from 'minireset.css';
import normalize from 'normalize.css';
import reset from 'reset-css';
import { css, injectGlobal } from 'styled-components';
import { fontFamily, FontFamily } from '../../lib/fonts';
import { MIN_WIDTH } from '../../lib/media';

const globalCss = css`
    /* Default font and min-width */
    body {
        ${fontFamily(FontFamily.BITTER)};
        min-width: ${MIN_WIDTH}px;
    }
`;

/* TODO: combine normalize, reset and minireset to single optimized file */
injectGlobal`
    /* stylelint-disable max-empty-lines */
    ${normalize};
    ${reset};
    ${minireset};
    ${globalCss};
`;
