import { css } from 'styled-components';
import { Width } from './mediaWidth';

const displayAt = (start: Width, end?: Width) => css`
    @media (max-width: ${start}px) {
        display: none;
    }

    ${end ? `@media (min-width: ${end}px) {display: none;}` : ''};
`;

export { displayAt };
