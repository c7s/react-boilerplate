import minireset from 'minireset.css';
import normalize from 'normalize.css';
import reset from 'reset-css';
import { createGlobalStyle, css } from 'styled-components';
import { fontFamily, FontFamily } from '../../lib/fonts';
import { MIN_WIDTH } from '../../lib/media';

const globalCss = css`
    /* Enabling 100% page min-height */
    html,
    body,
    #root {
        height: 100%;
    }

    body {
        min-width: ${MIN_WIDTH}px;
        ${fontFamily(FontFamily.BITTER)};
        background-color: #ebede8;
    }
`;

/* TODO: combine normalize, reset and minireset to single optimized file */
const ExternalAndGlobalStyles = createGlobalStyle`
    /* stylelint-disable max-empty-lines */
    ${normalize};
    ${reset};
    ${minireset};
    ${globalCss};
`;

export { ExternalAndGlobalStyles };
