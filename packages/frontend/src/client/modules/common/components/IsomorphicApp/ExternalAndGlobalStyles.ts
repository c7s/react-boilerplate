import minireset from 'minireset.css';
import normalize from 'normalize.css';
import reactResponsiveModalStyles from 'react-responsive-modal/src/styles.css';
import reset from 'reset-css';
import { createGlobalStyle, css } from 'styled-components';
import { fontFamily, FontFamily } from '../../lib/fonts';
import { MIN_WIDTH } from '../../lib/media';

const globalCss = css`
    html {
        /* Guarantees 100% viewport height */
        min-height: 100%;

        /* Enables growing body to html */
        display: flex;
        flex-direction: column;
        align-items: stretch;

        /* Fixes delay before click event on touch devices */
        touch-action: manipulation;
    }

    body {
        /* Grow to html height */
        flex-grow: 1;

        /* Enables growing #root to body */
        display: flex;
        flex-direction: column;
        align-items: stretch;

        /* Scale on small widths */
        min-width: ${MIN_WIDTH}px;

        /* There must be default font */
        ${fontFamily(FontFamily.BITTER)};

        /* Important for iOS overscroll. May be redefined for concrete Page via props */
        background-color: #ebede8;
    }

    #root {
        /* Grow to body height */
        flex-grow: 1;

        /* Enables sticky footer on IE11 */
        position: relative;

        /* Enables growing page content (excluding IE11) */
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    /* Define design-friendly outline color (in the name of a11y) */
    * {
        outline-color: #000000;
    }
`;

/* TODO: combine normalize, reset and minireset to single optimized file */
const ExternalAndGlobalStyles = createGlobalStyle`
    /* stylelint-disable max-empty-lines */
    ${normalize};
    ${reset};
    ${minireset};
    ${reactResponsiveModalStyles};
    ${globalCss};
`;

export { ExternalAndGlobalStyles };
