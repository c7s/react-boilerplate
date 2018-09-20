import { css } from 'styled-components';
import BitterBoldTtf from './Bitter-Bold/Bitter-Bold.ttf';
import BitterItalicTtf from './Bitter-Italic/Bitter-Italic.ttf';
import BitterRegularTtf from './Bitter-Regular/Bitter-Regular.ttf';

export const bitter = css`
    @font-face {
        font-family: 'Bitter';
        font-style: normal;
        font-weight: normal;
        src: url(${BitterRegularTtf}) format('truetype');
    }

    @font-face {
        font-family: 'Bitter';
        font-style: normal;
        font-weight: bold;
        src: url(${BitterBoldTtf}) format('truetype');
    }

    @font-face {
        font-family: 'Bitter';
        font-style: italic;
        font-weight: normal;
        src: url(${BitterItalicTtf}) format('truetype');
    }
`;
